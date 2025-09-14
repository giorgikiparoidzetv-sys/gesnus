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
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


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

# Admin Settings
ADMIN_EMAILS = [
    'phirosmanashvilinika2005@gmail.com',
    'alexxanderson28@gmail.com'
]

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

async def get_current_admin_user(current_user: dict = Depends(get_current_user)) -> dict:
    """Get current user and verify admin access"""
    user_email = current_user.get('email', '').lower()
    
    if user_email not in [email.lower() for email in ADMIN_EMAILS]:
        raise HTTPException(
            status_code=403, 
            detail="Access denied. Admin privileges required."
        )
    
    return current_user

def is_admin_email(email: str) -> bool:
    """Check if email is in admin list"""
    return email.lower() in [admin_email.lower() for admin_email in ADMIN_EMAILS]

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

async def save_order(order_data: dict) -> bool:
    """Save order to database"""
    try:
        result = await db.orders.insert_one(order_data)
        return result.inserted_id is not None
    except Exception as e:
        logging.error(f"Error saving order: {e}")
        return False

def send_order_email(order: Order, order_id: str) -> bool:
    """Send order notification email"""
    try:
        # Email configuration - use environment variables in production
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_username = os.environ.get('SMTP_USERNAME', '')
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        
        if not smtp_username or not smtp_password:
            logging.warning("SMTP credentials not configured, skipping email")
            return True  # Don't fail the order if email fails
        
        # Create email message
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = 'gesnusge@gmail.com'
        msg['Subject'] = f'New GeSnus Order #{order_id}'
        
        # Calculate delivery fee and total
        delivery_fee = 5.0
        final_total = order.totalAmount + delivery_fee
        
        # Create HTML email body
        items_html = ""
        for item in order.items:
            items_html += f"""
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">{item.name}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">{item.quantity}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₾{item.price:.2f}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₾{(item.price * item.quantity):.2f}</td>
                </tr>
            """
        
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8B4513;">New GeSnus Order</h2>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Order Details</h3>
                <p><strong>Order ID:</strong> {order_id}</p>
                <p><strong>Date:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC</p>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Customer Information</h3>
                <p><strong>Name:</strong> {order.fullName}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Order Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #8B4513; color: white;">
                            <th style="padding: 10px; text-align: left;">Product</th>
                            <th style="padding: 10px; text-align: center;">Qty</th>
                            <th style="padding: 10px; text-align: right;">Price</th>
                            <th style="padding: 10px; text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items_html}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">Subtotal:</td>
                            <td style="padding: 8px; text-align: right; font-weight: bold;">₾{order.totalAmount:.2f}</td>
                        </tr>
                        <tr>
                            <td colspan="3" style="padding: 8px; text-align: right; font-weight: bold;">Delivery:</td>
                            <td style="padding: 8px; text-align: right; font-weight: bold;">₾{delivery_fee:.2f}</td>
                        </tr>
                        <tr style="background-color: #8B4513; color: white;">
                            <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">TOTAL:</td>
                            <td style="padding: 10px; text-align: right; font-weight: bold;">₾{final_total:.2f}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Next Steps:</strong></p>
                <p style="margin: 5px 0 0 0;">Customer will make bank transfer and contact you for delivery coordination.</p>
            </div>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(html_body, 'html'))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(msg)
        
        logging.info(f"Order notification email sent for order {order_id}")
        return True
        
    except Exception as e:
        logging.error(f"Failed to send order email: {e}")
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


# Order endpoints
@api_router.post("/order", response_model=OrderResponse)
async def create_order(order: Order):
    """Create a new order and send notification email"""
    try:
        # Generate unique order ID
        order_id = f"GS{datetime.utcnow().strftime('%Y%m%d')}{str(uuid.uuid4())[:8].upper()}"
        
        # Create order document
        order_doc = {
            "id": order_id,
            "fullName": order.fullName,
            "email": order.email,
            "address": order.address,
            "phone": order.phone,
            "totalAmount": order.totalAmount,
            "items": [item.dict() for item in order.items],
            "status": "pending",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        
        # Save order to database
        saved = await save_order(order_doc)
        if not saved:
            raise HTTPException(status_code=500, detail="Failed to save order")
        
        # Send notification email (non-blocking - don't fail if email fails)
        try:
            send_order_email(order, order_id)
        except Exception as e:
            logging.error(f"Email sending failed for order {order_id}: {e}")
            # Continue anyway - order is saved
        
        return OrderResponse(
            success=True,
            message="Order created successfully",
            orderId=order_id
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Order creation error: {e}")
        raise HTTPException(status_code=500, detail="Failed to create order")

@api_router.get("/orders", response_model=List[dict])
async def get_orders(current_user: dict = Depends(get_current_user)):
    """Get orders for the current user (admin feature)"""
    try:
        # For now, return all orders (in production, add proper admin role checking)
        orders = await db.orders.find().sort("created_at", -1).to_list(100)
        return orders
    except Exception as e:
        logging.error(f"Error fetching orders: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch orders")


# ===============================
# ADMIN ENDPOINTS
# ===============================

@api_router.get("/admin/orders", response_model=List[dict])
async def get_all_orders_admin(admin_user: dict = Depends(get_current_admin_user)):
    """Get all orders for admin panel"""
    try:
        orders = await db.orders.find().sort("created_at", -1).to_list(1000)
        
        # Add calculated delivery fee and final total to each order
        for order in orders:
            subtotal = order.get('totalAmount', 0)
            delivery_fee = 5.0  # Fixed delivery fee
            order['delivery_fee'] = delivery_fee
            order['final_total'] = subtotal + delivery_fee
        
        return orders
    except Exception as e:
        logging.error(f"Error fetching orders for admin: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch orders")

@api_router.put("/admin/orders/{order_id}")
async def update_order_status(
    order_id: str, 
    status: str = Query(..., description="New order status"),
    admin_user: dict = Depends(get_current_admin_user)
):
    """Update order status (admin only)"""
    try:
        # Valid statuses
        valid_statuses = ["pending", "processing", "shipped", "delivered", "cancelled", "completed"]
        
        if status not in valid_statuses:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
            )
        
        # Update order status
        result = await db.orders.update_one(
            {"id": order_id},
            {
                "$set": {
                    "status": status,
                    "updated_at": datetime.utcnow(),
                    "updated_by": admin_user['email']
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return {
            "success": True,
            "message": f"Order {order_id} status updated to {status}",
            "order_id": order_id,
            "status": status
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating order status: {e}")
        raise HTTPException(status_code=500, detail="Failed to update order status")

@api_router.get("/admin/orders/{order_id}")
async def get_order_details_admin(
    order_id: str,
    admin_user: dict = Depends(get_current_admin_user)
):
    """Get detailed order information (admin only)"""
    try:
        order = await db.orders.find_one({"id": order_id})
        
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        # Add calculated delivery fee and final total
        subtotal = order.get('totalAmount', 0)
        delivery_fee = 5.0
        order['delivery_fee'] = delivery_fee
        order['final_total'] = subtotal + delivery_fee
        
        return order
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching order details: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch order details")

@api_router.get("/admin/stats")
async def get_admin_stats(admin_user: dict = Depends(get_current_admin_user)):
    """Get dashboard statistics for admin"""
    try:
        # Count orders by status
        pipeline = [
            {
                "$group": {
                    "_id": "$status",
                    "count": {"$sum": 1},
                    "total_amount": {"$sum": "$totalAmount"}
                }
            }
        ]
        
        status_stats = await db.orders.aggregate(pipeline).to_list(100)
        
        # Get total orders count
        total_orders = await db.orders.count_documents({})
        
        # Get recent orders (last 10)
        recent_orders = await db.orders.find().sort("created_at", -1).limit(10).to_list(10)
        
        return {
            "total_orders": total_orders,
            "status_breakdown": status_stats,
            "recent_orders": recent_orders
        }
    
    except Exception as e:
        logging.error(f"Error fetching admin stats: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")


# ===============================
# END ADMIN ENDPOINTS
# ===============================


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