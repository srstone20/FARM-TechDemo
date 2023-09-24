from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.UserNameModel import UserName

# Start API Object
app = FastAPI()

# Import Database Functions
from DatabaseFunctions import (
    create_user,
    read_one_user,
    read_all_users,
    update_user,
    remove_user
)

# Origins
origins = [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://127.0.0.1:8000/'
]

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Root
@app.get("/")
def read_root():
    return {"Connected to Root Object"}

# Create User
@app.post("/api/user", response_model=UserName)
async def post_user(user:UserName):
    response = await create_user(user.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request")

# Read 1 User
@app.get("/api/user{id}", response_model=UserName)
async def get_user_by_id(id):
    response = await read_one_user(id)
    if response:
        return response
    raise HTTPException(404, f"There is no User with this ID: {id}")

# Read All Users
@app.get("/api/user")
async def get_user():
    response = await read_all_users()
    return response

# Update User
@app.put("/api/user/{id}", response_model=UserName)
async def put_user(id:str, name:str):
    response = await update_user(id, name)
    if response:
        return response
    raise HTTPException(404, f"There is no Todo item with this title {id}")

# Delete User
@app.delete("/api/user/{id}/")
async def delete_user(id):
    response = await remove_user(id)
    if response:
        return "Successfully deleted User"
    raise HTTPException(404, f"There is no Todo item with this title {id}")

