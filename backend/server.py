from datetime import datetime
import random
from sqlite3 import Date
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import databases
import sqlalchemy
from pydantic import BaseModel
import os
from dotenv import load_dotenv


load_dotenv()
DATABASE_URL = (os.environ["DATABASE"])


def id_generator():
    i = 300
    while True:
        yield i
        i += 1


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
    sqlalchemy.Column("postId", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("email", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("body", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime,
                      nullable=False, default=datetime.now())
)
posts = sqlalchemy.Table(
    "posts",
    metadata,
    sqlalchemy.Column("userId", sqlalchemy.Integer, nullable=False),
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("body", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime,
                      nullable=False, default=datetime.now())
)
engine = sqlalchemy.create_engine(
    DATABASE_URL
)
metadata.create_all(engine)


class User(BaseModel):
    _id: int
    name: str
    username: str
    email: str
    address: object
    phone: str
    website: str
    company: object
    created_at: Date


class Post(BaseModel):
    _id: int
    userId: int
    title: str
    body: str
    created_at: Date


class Comment(BaseModel):
    _id: int
    postId: int
    name: str
    email: str
    body: str
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
    gen = id_generator()
    _id = next(gen) * random.random()
    query = users.insert().values(
        id=_id,
        name=user.name,
        username=user.username,
        email=user.email,
        address=str(json.dumps(user.address)),
        phone=user.phone,
        website=user.website,
        company=str(json.dumps(user.company)),
        created_at=datetime.now())
    await database.execute(query)
    query_user = users.select().where(users.columns.id == _id)
    await database.execute(query_user)
    created_user = await database.fetch_all(query_user)
    return created_user


@app.delete("/users/{id}")
async def deleteUser(id: int):
    query = users.delete().where(users.columns.id == id)
    await database.execute(query)
    return {"message": "usuário {id} deletado com sucesso"}


@app.put("/users/{id}")
async def updateUser(_id: int, user: User):
    query = users.update().where(users.columns.id == _id).values(
        name=user.name,
        username=user.username,
        email=user.email,
        address=str(json.dumps(user.address)),
        phone=user.phone,
        website=user.website,
        company=str(json.dumps(user.company)),
        created_at=datetime.now()
    )
    await database.execute(query)
    query_updated_user = users.select().where(users.columns.id == _id)
    user_updated = await database.execute(query_updated_user)
    return user_updated


@ app.get("/users/{id}")
async def getOneUser(_id: int):
    query = users.select().where(users.columns.id == _id)
    user = await database.fetch_one(query)
    return user


@ app.get("/posts")
async def getAllPosts():
    query = posts.select()
    all_posts = await database.fetch_all(query)
    return all_posts


@ app.get("/posts/{userId}")
async def getAllPostsByUser(userId: int):
    query = posts.select().where(posts.columns.userId == userId)
    all_posts_by_user = await database.fetch_all(query)
    return all_posts_by_user


@ app.delete("/posts/{id}")
async def deleteOnePost(_id: int):
    query = posts.delete().where(posts.columns.id == _id)
    await database.execute(query)
    return {'message': 'post deletado'}


@ app.put("/posts/{id}")
async def updateOnePost(_id: int, userId: int, post: Post):
    query = posts.update().where(posts.columns.id == _id).values(id=_id,
                                                                 userId=userId,
                                                                 title=post.title,
                                                                 body=post.body,
                                                                 created_at=str(post.created_at))
    await database.execute(query)
    post = await database.fetch_one(posts.select().where(posts.columns.id == _id))
    return post


@ app.post("/posts")
async def createPost(post: Post):
    gen = id_generator()
    _id = next(gen) * random.random()
    query = posts.insert().values(id=_id,
                                  userId=post.userId,
                                  title=post.title,
                                  body=post.body,
                                  created_at=datetime.now())
    await database.execute(query)
    query_post_created = posts.select().where(posts.columns.id == _id)
    post = await database.fetch_one(query_post_created)
    return post


@ app.get("/comments/{postId}")
async def getCommentsByPostId(postId: int):
    query = comments.select().where(comments.columns.postId == postId)
    all_comments = await database.fetch_all(query)
    return all_comments


@ app.post("/comments/{postId}")
async def createComment(postId: int, comment: Comment):
    gen = id_generator()
    _id = next(gen)*random.random()

    query = comments.insert().values(postId=postId,
                                     id=_id,
                                     name=comment.name,
                                     email=comment.email,
                                     body=comment.body,
                                     created_at=datetime.now())
    await database.execute(query)
    created_comment = await database.fetch_one(comments.select().where(comments.columns.id == _id))
    return created_comment


@ app.put("/comments/{_id}")
async def updateComment(_id: int, postId: int, comment: Comment):
    query = comments.update().where(comments.columns.id == _id).values(
        postId=postId,
        id=_id,
        name=comment.name,
        email=comment.email,
        body=comment.body,
        created_at=datetime.now())
    await database.execute(query)
    updated_comment = await database.fetch_one(comments.select().where(comments.columns.id == _id))
    return updated_comment


@ app.delete("/comments/{_id}")
async def deleteComment(_id: int):
    query = comments.delete().where(comments.columns.id == _id)
    await database.execute(query)
    return {'message': 'success'}
