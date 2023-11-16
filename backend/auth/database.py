from datetime import datetime
from typing import AsyncGenerator, Optional

from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from fastapi_users_db_sqlalchemy.access_token import (
    SQLAlchemyAccessTokenDatabase,
    SQLAlchemyBaseAccessTokenTable,
)
from sqlalchemy import Column, String, Boolean, Integer, ForeignKey, TIMESTAMP
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker

from backend.config import DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME
from backend.models.models import auth

DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
Base: DeclarativeMeta = declarative_base()


class User(SQLAlchemyBaseUserTable[int], Base):
    id: int = Column(Integer, primary_key=True)
    email: str = Column(String, nullable=False)
    username: str = Column(String, nullable=False)
    hashed_password: str = Column(String, nullable=False)
    name: str = Column(String)
    surname: str = Column(String)
    patronymic: str = Column(String)
    token_id = Column(Integer, ForeignKey(auth.c.id))
    is_active: bool = Column(Boolean, default=True, nullable=False)
    is_superuser: bool = Column(Boolean, default=False, nullable=False)
    is_verified: bool = Column(Boolean, default=False, nullable=False)


class AccessToken(SQLAlchemyBaseAccessTokenTable[int], Base):
    id: int = Column(Integer, primary_key=True)
    oauth_name: str = Column(String, nullable=False)
    access_token: str = Column(String, nullable=False)
    expires_at: Optional[int]
    refresh_token: str = Column(String, nullable=False)
    account_id: str = Column(String, nullable=False)
    account_email: str = Column(String, nullable=False)
    token_expire_date = Column(TIMESTAMP, nullable=False)
    refresh_expire_date = Column(TIMESTAMP, nullable=False)


engine = create_async_engine(DATABASE_URL)
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)


async def get_access_token_db(session: AsyncSession = Depends(get_async_session)):  #
    yield SQLAlchemyAccessTokenDatabase(session, AccessToken)