import os
from fastapi import FastAPI, HTTPException, Header, Depends
from google.oauth2 import id_token
from google.auth.transport import requests

app = FastAPI()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

def get_current_user(authorization: str = Header(None)):
    """
    Dependency to verify the Google ID token and return user info.
    Raises 401 if invalid or missing.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")
    
    token = authorization.replace("Bearer ", "")
    
    try:
        # Verify the ID token
        id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        
        # Return user details from token
        return {
            "id": id_info['sub'],
            "email": id_info.get('email'),
            "name": id_info.get('name')
        }
    except ValueError as e:
        # Invalid token
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

@app.get("/")
def read_root(current_user: dict = Depends(get_current_user, use_cache=False)):
    return {
        "gold": f"Welcome {current_user['name']}! Here is your secure data: Gold is only visible to logged in users.. :-) ",
        "user": current_user
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}
