import os
from fastapi import FastAPI, HTTPException, Header
from google.oauth2 import id_token
from google.auth.transport import requests

app = FastAPI()

# Make sure to set GOOGLE_CLIENT_ID in your .env
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/verify-token")
def verify_google_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="No authorization header")
    
    token = authorization.replace("Bearer ", "")
    
    try:
        # Verify the ID token
        id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        
        # User details from token
        userid = id_info['sub']
        email = id_info.get('email')
        name = id_info.get('name')
        
        return {
            "status": "authenticated",
            "user": {
                "id": userid,
                "email": email,
                "name": name
            }
        }
    except ValueError as e:
        # Invalid token
        raise HTTPException(status_code=401, detail=str(e))
