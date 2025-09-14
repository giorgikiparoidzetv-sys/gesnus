#!/usr/bin/env python3
"""
Backend Authentication API Testing Suite
Tests all authentication endpoints for the FastAPI backend
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://setup-replica.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class AuthAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.test_user_email = f"testuser_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        self.test_user_password = "SecurePassword123!"
        self.test_user_name = "John Doe"
        self.confirmation_token = None
        self.jwt_token = None
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'details': details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_user_registration_valid(self):
        """Test POST /api/auth/register with valid user data"""
        try:
            payload = {
                "email": self.test_user_email,
                "password": self.test_user_password,
                "full_name": self.test_user_name
            }
            
            response = self.session.post(f"{API_BASE}/auth/register", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'confirmation_token' in data:
                    self.confirmation_token = data['confirmation_token']
                    self.log_test(
                        "User Registration (Valid Data)", 
                        True, 
                        "User registered successfully with confirmation token",
                        {"status_code": response.status_code, "token_received": bool(self.confirmation_token)}
                    )
                else:
                    self.log_test(
                        "User Registration (Valid Data)", 
                        False, 
                        "Registration succeeded but missing expected fields",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "User Registration (Valid Data)", 
                    False, 
                    f"Registration failed with status {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "User Registration (Valid Data)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def test_user_registration_duplicate(self):
        """Test POST /api/auth/register with duplicate email"""
        try:
            payload = {
                "email": self.test_user_email,  # Same email as before
                "password": "AnotherPassword123!",
                "full_name": "Jane Doe"
            }
            
            response = self.session.post(f"{API_BASE}/auth/register", json=payload)
            
            if response.status_code == 400:
                data = response.json()
                if "already exists" in data.get('detail', '').lower():
                    self.log_test(
                        "User Registration (Duplicate Email)", 
                        True, 
                        "Correctly rejected duplicate email registration",
                        {"status_code": response.status_code}
                    )
                else:
                    self.log_test(
                        "User Registration (Duplicate Email)", 
                        False, 
                        "Wrong error message for duplicate email",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "User Registration (Duplicate Email)", 
                    False, 
                    f"Should have failed with 400, got {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "User Registration (Duplicate Email)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def test_email_confirmation_valid(self):
        """Test POST /api/auth/confirm-email with valid token"""
        if not self.confirmation_token:
            self.log_test(
                "Email Confirmation (Valid Token)", 
                False, 
                "No confirmation token available from registration",
                {"token": self.confirmation_token}
            )
            return
            
        try:
            response = self.session.post(f"{API_BASE}/auth/confirm-email?token={self.confirmation_token}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log_test(
                        "Email Confirmation (Valid Token)", 
                        True, 
                        "Email confirmed successfully",
                        {"status_code": response.status_code, "message": data.get('message')}
                    )
                else:
                    self.log_test(
                        "Email Confirmation (Valid Token)", 
                        False, 
                        "Confirmation failed despite 200 status",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Email Confirmation (Valid Token)", 
                    False, 
                    f"Confirmation failed with status {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Email Confirmation (Valid Token)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def test_email_confirmation_invalid(self):
        """Test POST /api/auth/confirm-email with invalid token"""
        try:
            invalid_token = "invalid_token_12345"
            response = self.session.post(f"{API_BASE}/auth/confirm-email?token={invalid_token}")
            
            if response.status_code == 400:
                data = response.json()
                if "invalid" in data.get('detail', '').lower():
                    self.log_test(
                        "Email Confirmation (Invalid Token)", 
                        True, 
                        "Correctly rejected invalid confirmation token",
                        {"status_code": response.status_code}
                    )
                else:
                    self.log_test(
                        "Email Confirmation (Invalid Token)", 
                        False, 
                        "Wrong error message for invalid token",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Email Confirmation (Invalid Token)", 
                    False, 
                    f"Should have failed with 400, got {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Email Confirmation (Invalid Token)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def test_login_confirmed_user(self):
        """Test POST /api/auth/login with confirmed user credentials"""
        try:
            payload = {
                "email": self.test_user_email,
                "password": self.test_user_password
            }
            
            response = self.session.post(f"{API_BASE}/auth/login", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'token' in data:
                    self.jwt_token = data['token']
                    self.log_test(
                        "Login (Confirmed User)", 
                        True, 
                        "Login successful with JWT token",
                        {"status_code": response.status_code, "token_received": bool(self.jwt_token)}
                    )
                else:
                    self.log_test(
                        "Login (Confirmed User)", 
                        False, 
                        "Login succeeded but missing token",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Login (Confirmed User)", 
                    False, 
                    f"Login failed with status {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Login (Confirmed User)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def test_login_wrong_password(self):
        """Test POST /api/auth/login with wrong password"""
        try:
            payload = {
                "email": self.test_user_email,
                "password": "WrongPassword123!"
            }
            
            response = self.session.post(f"{API_BASE}/auth/login", json=payload)
            
            if response.status_code == 401:
                data = response.json()
                if "invalid" in data.get('detail', '').lower():
                    self.log_test(
                        "Login (Wrong Password)", 
                        True, 
                        "Correctly rejected wrong password",
                        {"status_code": response.status_code}
                    )
                else:
                    self.log_test(
                        "Login (Wrong Password)", 
                        False, 
                        "Wrong error message for invalid credentials",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Login (Wrong Password)", 
                    False, 
                    f"Should have failed with 401, got {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Login (Wrong Password)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def test_login_unconfirmed_user(self):
        """Test POST /api/auth/login with unconfirmed user"""
        try:
            # Register a new user but don't confirm email
            unconfirmed_email = f"unconfirmed_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
            payload = {
                "email": unconfirmed_email,
                "password": "TestPassword123!",
                "full_name": "Unconfirmed User"
            }
            
            # Register user
            reg_response = self.session.post(f"{API_BASE}/auth/register", json=payload)
            if reg_response.status_code != 200:
                self.log_test(
                    "Login (Unconfirmed User)", 
                    False, 
                    "Failed to register unconfirmed test user",
                    {"registration_status": reg_response.status_code}
                )
                return
            
            # Try to login without confirming email
            login_payload = {
                "email": unconfirmed_email,
                "password": "TestPassword123!"
            }
            
            response = self.session.post(f"{API_BASE}/auth/login", json=login_payload)
            
            if response.status_code == 401:
                data = response.json()
                if "confirm" in data.get('detail', '').lower():
                    self.log_test(
                        "Login (Unconfirmed User)", 
                        True, 
                        "Correctly rejected unconfirmed user login",
                        {"status_code": response.status_code}
                    )
                else:
                    self.log_test(
                        "Login (Unconfirmed User)", 
                        False, 
                        "Wrong error message for unconfirmed user",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Login (Unconfirmed User)", 
                    False, 
                    f"Should have failed with 401, got {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Login (Unconfirmed User)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def test_protected_route_valid_token(self):
        """Test GET /api/auth/me with valid JWT token"""
        if not self.jwt_token:
            self.log_test(
                "Protected Route (Valid Token)", 
                False, 
                "No JWT token available from login",
                {"token": self.jwt_token}
            )
            return
            
        try:
            headers = {"Authorization": f"Bearer {self.jwt_token}"}
            response = self.session.get(f"{API_BASE}/auth/me", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if 'email' in data and 'id' in data:
                    self.log_test(
                        "Protected Route (Valid Token)", 
                        True, 
                        "Successfully accessed protected route",
                        {"status_code": response.status_code, "user_data": bool(data.get('email'))}
                    )
                else:
                    self.log_test(
                        "Protected Route (Valid Token)", 
                        False, 
                        "Missing expected user data in response",
                        {"status_code": response.status_code, "response": data}
                    )
            else:
                self.log_test(
                    "Protected Route (Valid Token)", 
                    False, 
                    f"Protected route failed with status {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Protected Route (Valid Token)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def test_protected_route_no_token(self):
        """Test GET /api/auth/me without token"""
        try:
            response = self.session.get(f"{API_BASE}/auth/me")
            
            if response.status_code == 401 or response.status_code == 403:
                self.log_test(
                    "Protected Route (No Token)", 
                    True, 
                    "Correctly rejected request without token",
                    {"status_code": response.status_code}
                )
            else:
                self.log_test(
                    "Protected Route (No Token)", 
                    False, 
                    f"Should have failed with 401/403, got {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Protected Route (No Token)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def test_protected_route_invalid_token(self):
        """Test GET /api/auth/me with invalid token"""
        try:
            headers = {"Authorization": "Bearer invalid_jwt_token_12345"}
            response = self.session.get(f"{API_BASE}/auth/me", headers=headers)
            
            if response.status_code == 401:
                self.log_test(
                    "Protected Route (Invalid Token)", 
                    True, 
                    "Correctly rejected invalid token",
                    {"status_code": response.status_code}
                )
            else:
                self.log_test(
                    "Protected Route (Invalid Token)", 
                    False, 
                    f"Should have failed with 401, got {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except Exception as e:
            self.log_test(
                "Protected Route (Invalid Token)", 
                False, 
                f"Exception occurred: {str(e)}",
                {"error": str(e)}
            )
    
    def run_all_tests(self):
        """Run all authentication tests in sequence"""
        print(f"🚀 Starting Authentication API Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"Test User Email: {self.test_user_email}")
        print("=" * 60)
        
        # Test sequence - order matters for dependent tests
        self.test_user_registration_valid()
        self.test_user_registration_duplicate()
        self.test_email_confirmation_valid()
        self.test_email_confirmation_invalid()
        self.test_login_confirmed_user()
        self.test_login_wrong_password()
        self.test_login_unconfirmed_user()
        self.test_protected_route_valid_token()
        self.test_protected_route_no_token()
        self.test_protected_route_invalid_token()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        failed = len(self.test_results) - passed
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        
        if failed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  • {result['test']}: {result['message']}")
                    if result['details']:
                        print(f"    Details: {result['details']}")
        
        return failed == 0

def main():
    """Main test execution"""
    tester = AuthAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All authentication tests passed!")
        sys.exit(0)
    else:
        print("\n💥 Some tests failed. Check the details above.")
        sys.exit(1)

if __name__ == "__main__":
    main()