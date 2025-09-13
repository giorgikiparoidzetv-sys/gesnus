from fastapi import FastAPI, APIRouter, HTTPException, Query, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
import jwt
import hashlib
import secrets
import smtplib
from email.message import EmailMessage
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Settings
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24

# Security
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    full_name: str
    password_hash: str
    is_confirmed: bool = False
    confirmation_token: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None
    user: Optional[dict] = None

class ConfirmEmailResponse(BaseModel):
    success: bool
    message: str

class OrderItem(BaseModel):
    id: str
    name: str
    quantity: int
    price: float

class Order(BaseModel):
    fullName: str
    email: EmailStr
    address: str
    phone: str
    totalAmount: float
    items: List[OrderItem]

class OrderResponse(BaseModel):
    success: bool
    message: str
    orderId: Optional[str] = None


# Utility Functions
def hash_password(password: str) -> str:
    """Hash password using SHA-256 (in production, use bcrypt)"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return hash_password(password) == hashed_password

def generate_confirmation_token() -> str:
    """Generate a secure confirmation token"""
    return secrets.token_urlsafe(32)

def create_jwt_token(user_data: dict) -> str:
    """Create JWT token for user"""
    payload = {
        'user_id': user_data['id'],
        'email': user_data['email'],
        'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> Optional[dict]:
    """Verify JWT token and return user data"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Get current user from JWT token"""
    token = credentials.credentials
    payload = verify_jwt_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user = await db.users.find_one({"id": payload['user_id']})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user

async def get_user_by_email(email: str) -> Optional[dict]:
    """Get user by email from database"""
    return await db.users.find_one({"email": email})

async def get_user_by_token(token: str) -> Optional[dict]:
    """Get user by confirmation token"""
    return await db.users.find_one({"confirmation_token": token})

async def save_user(user_data: dict) -> bool:
    """Save user to database"""
    try:
        if '_id' in user_data:
            # Update existing user
            result = await db.users.update_one(
                {"id": user_data['id']}, 
                {"$set": user_data}
            )
            return result.modified_count > 0
        else:
            # Insert new user
            result = await db.users.insert_one(user_data)
            return result.inserted_id is not None
    except Exception as e:
        logging.error(f"Error saving user: {e}")
        return False


# Basic endpoints
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# Authentication endpoints
@api_router.post("/auth/register", response_model=dict)
async def register_user(user_data: UserCreate):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = await get_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="User with this email already exists")
        
        # Create new user
        confirmation_token = generate_confirmation_token()
        user = User(
            email=user_data.email,
            full_name=user_data.full_name,
            password_hash=hash_password(user_data.password),
            confirmation_token=confirmation_token,
            is_confirmed=False
        )
        
        # Save to database
        user_dict = user.dict()
        saved = await save_user(user_dict)
        
        if not saved:
            raise HTTPException(status_code=500, detail="Failed to create user")
        
        return {
            "success": True,
            "message": "User registered successfully. Please check your email for confirmation.",
            "confirmation_token": confirmation_token  # In production, send this via email
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail="Registration failed")

@api_router.post("/auth/confirm-email", response_model=ConfirmEmailResponse)
async def confirm_email(token: str = Query(...)):
    """Confirm user email with token"""
    try:
        # Find user by confirmation token
        user = await get_user_by_token(token)
        if not user:
            raise HTTPException(status_code=400, detail="Invalid or expired confirmation token")
        
        if user.get('is_confirmed'):
            return ConfirmEmailResponse(
                success=True,
                message="Email already confirmed"
            )
        
        # Update user confirmation status
        user['is_confirmed'] = True
        user['confirmation_token'] = None  # Clear the token
        user['updated_at'] = datetime.utcnow()
        
        saved = await save_user(user)
        if not saved:
            raise HTTPException(status_code=500, detail="Failed to confirm email")
        
        return ConfirmEmailResponse(
            success=True,
            message="Email confirmed successfully"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Email confirmation error: {e}")
        raise HTTPException(status_code=500, detail="Email confirmation failed")

@api_router.post("/auth/login", response_model=LoginResponse)
async def login_user(login_data: LoginRequest):
    """Authenticate user and return JWT token"""
    try:
        # Find user by email
        user = await get_user_by_email(login_data.email)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Verify password
        if not verify_password(login_data.password, user['password_hash']):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Check if email is confirmed
        if not user.get('is_confirmed'):
            raise HTTPException(status_code=401, detail="Please confirm your email before logging in")
        
        # Create JWT token
        token = create_jwt_token(user)
        
        # Remove sensitive information
        user_safe = {
            'id': user['id'],
            'email': user['email'],
            'full_name': user['full_name'],
            'created_at': user['created_at']
        }
        
        return LoginResponse(
            success=True,
            message="Login successful",
            token=token,
            user=user_safe
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Login failed")

@api_router.get("/auth/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    return {
        'id': current_user['id'],
        'email': current_user['email'],
        'full_name': current_user['full_name'],
        'is_confirmed': current_user.get('is_confirmed', False),
        'created_at': current_user['created_at']
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()