
# Backend Documentation

- `main.py` runs the server
- `DatabaseFunctions.py` connects to the database
- `UserNameModel.py` is a model for the user names

# main py file

- FastAPI server starts/runs in this file
```
app = FastAPI()
```
- Imports functions created in `DatabaseFunctions`
```
from DatabaseFunctions import (
    create_user,
    read_one_user,
    read_all_users,
    update_user,
    remove_user
)
```

### Middleware

- Middleware is used for CORS
- Might not be needed when using DigitalOcean
```
origins = [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://127.0.0.1:8000/'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### CRUD: Create

- Asynchronous function `post_user` to post to the database
- Calls the database function `create_user`
```
@app.post("/api/user", response_model=UserName)
async def post_user(user:UserName):
    response = await create_user(user.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong, bad request")
```

### CRUD: Read

- Two functions for reading 1 item and reading all items
- Uses the ID value for getting an item
```
@app.get("/api/user{id}", response_model=UserName)
async def get_user_by_id(id):
    response = await read_one_user(id)
    if response:
        return response
    raise HTTPException(404, f"There is no User with this ID: {id}")

@app.get("/api/user")
async def get_user():
    response = await read_all_users()
    return response
```

### CRUD: Update

- Function `put_user` that calls database function `update_user`
```
@app.put("/api/user/{id}", response_model=UserName)
async def put_user(id:str, name:str):
    response = await update_user(id, name)
    if response:
        return response
    raise HTTPException(404, f"There is no Todo item with this title {id}")
```

### CRUD: Delete

- Function `delete_user` that calls database function `remove_user`
```
@app.delete("/api/user/{id}/")
async def delete_user(id):
    response = await remove_user(id)
    if response:
        return "Successfully deleted User"
    raise HTTPException(404, f"There is no Todo item with this title {id}")
```

# DatabaseFunctions py file

- Connects to the database using secret environment variables
```
from dotenv import load_dotenv
import os

load_dotenv()
connection_string = os.getenv("ConnectionString")

import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)
```
- Connect to the database and the collection
```
database = client.UserNamesTechDemo
collection = database.NamesEntered
```

### CRUD: Create

- Creates a document object 
- Calls the MongoDB method `insert_one` to insert the document
```
async def create_user(user):
    document = user
    result = await collection.insert_one(document)
    return document
```

### CRUD: Read One

- Function for reading 1 item in the database
- Calls the MongoDB method `find_one(parameter)` with a parameter to search the database with
- Returns the document
```
async def read_one_user(id):
    document = await collection.find_one({"id":id})
    return document
```

### CRUD: Read All

- Function for reading all documents in the database
- Calls the MongoDB method `find` to find all documents
- Loops to append documents into list, returns list
```
async def read_all_users():
    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(UserName(**document))
    return users
```

### CRUD: Update

- Function for updating a document using a parameter
- Calls the MongoDB method `update_one`
- Calls the MongoDB method `find_one` to find the changed document and return it
```
async def update_user(id, name):
    await collection.update_one({"id":id}, {"$set": {"name": name}})
    document = await collection.find_one({"id": id})
    return document
```

### CRUD: Delete

- Function for deleting a document using a parameter
- Calls the MongoDB method `delete_one`
- Returns True if document found and deleted
```
async def remove_user(id):
    await collection.delete_one({"id":id})
    return True
```

# UserNameModel py file

- A model for inserting documents
- The model is designed to be the same as the document in the database collection
- Create the document keys and their data type
```
from pydantic import BaseModel

class UserName(BaseModel):
    id: str
    name: str
```