from pydantic import BaseModel

class UserName(BaseModel):
    id: str
    name: str