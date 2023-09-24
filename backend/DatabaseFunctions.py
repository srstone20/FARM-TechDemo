from models.UserNameModel import UserName
from dotenv import load_dotenv
import os

# Get Secret Items
load_dotenv()
connection_string = os.getenv("ConnectionString")

# MongoDB Driver
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)

# Create Database & Collection
database = client.UserNamesTechDemo
collection = database.NamesEntered

# Create a User Name
async def create_user(user):
    document = user
    result = await collection.insert_one(document)
    return document

# Read / Fetch 1 User Name
async def read_one_user(id):
    document = await collection.find_one({"id":id})
    return document

# Read / Fetch All User Names
async def read_all_users():
    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(UserName(**document))
    return users

# Update a User Name
async def update_user(id, name):
    await collection.update_one({"id":id}, {"$set": {"name": name}})
    document = await collection.find_one({"id": id})
    return document

# Delete a User Name
async def remove_user(id):
    await collection.delete_one({"id":id})
    return True