from datetime import datetime
from sqlite3 import Date
import json
from click import DateTime
import openpyxl
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import databases
import pandas as pd
import sqlalchemy
from pydantic import BaseModel
import os
from openpyxl.utils.dataframe import dataframe_to_rows
from dotenv import load_dotenv
from itertools import islice

load_dotenv()
DATABASE_URL = (os.environ["DATABASE"])

database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("username", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("email", sqlalchemy.String, nullable=False),
    sqlalchemy.Column(
        "address", sqlalchemy.dialects.postgresql.JSON, nullable=False),
    sqlalchemy.Column("phone", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("website", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("company", sqlalchemy.JSON, nullable=False),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime,
                      nullable=False, default=datetime.now())
)
comments = sqlalchemy.Table(
    "comments",
    metadata,
    sqlalchemy.Column("postId", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("email", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("body", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("created_at", sqlalchemy.String,
                      nullable=False, default=datetime.now())
)
posts = sqlalchemy.Table(
    "posts",
    metadata,
    sqlalchemy.Column("userId", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("body", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("created_at", sqlalchemy.String,
                      nullable=False, default=datetime.now())
)
engine = sqlalchemy.create_engine(
    DATABASE_URL
)
metadata.create_all(engine)


class Company(BaseModel):
    name: str
    catchPhrase: str
    bs: str


class Geo(BaseModel):
    lat: str
    lng: str


class Address(BaseModel):
    street: str
    suite: str
    city: str
    zipcode: str
    geo: Geo


class User(BaseModel):
    id: int
    name: str
    username: str
    email: str
    address: object
    phone: str
    website: str
    company: object
    created_at: Date


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await database.connect()
    print(database.connection())


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/")
async def home():
    return {"server runing"}


@app.get("/users", response_model=List)
async def getUsers():
    query = users.select()
    return await database.fetch_all(query)


@app.post("/users")
async def createUser(user: User):
    query = users.insert().values(
        id=user.id,
        name=user.name,
        username=user.username,
        email=user.email,
        address=str(json.dumps(user.address)),
        phone=user.phone,
        website=user.website,
        company=str(json.dumps(user.company)),
        created_at=str(user.created_at))
    await database.execute(query)
    query_user = users.select().where(users.columns.id == user.id)
    await database.execute(query_user)
    created_user = await database.fetch_all(query_user)
    return created_user


@app.get("/users/{id}")
async def getOneUser(id: int):
    query = users.select().where(users.columns.id == id)
    user = await database.fetch_one(query)
    return user


@app.get("/comments/{userId}")
async def getCommentsByUser(userId: int):
    query = comments.select().where(comments.columns.userId == userId)
    comments = await database.execute(query)
    return comments


@app.post("/comments")
async def createComment(comment):
    query = comments.select().where(comments.columns.userId == comment)
    comments = await database.execute(query)
    return comments


# @app.delete("/file/delete/{file_id}")
# async def update_file(file_id: int):
#     query = files.delete().where(files.columns.id == file_id)
#     await database.execute(query)
#     return {"message": "the file with id={} deleted successfully".format(file_id)}


# @app.get("/file/conciliado")
# async def conciliado():
#     query = "SELECT file_url FROM files ORDER BY upload_at DESC LIMIT 5"
#     await database.execute(query)
#     return json_ob
