from datetime import datetime

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyBaseAccessTokenTable
from sqlalchemy import MetaData, Table, Column, Integer, String, TIMESTAMP, ForeignKey, Boolean
from sqlalchemy.orm import Mapped

from src.database import Base

metadata = MetaData()

accesstoken = Table(
    "accesstoken",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("token", String, nullable=False),
    Column("created_at", TIMESTAMP, default=datetime.utcnow),
    Column("user_id", Integer, ForeignKey("user.id")),
    Column("refresh_token", String),
    Column("refresh_created_at", TIMESTAMP),
)

user = Table(
    "user",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("username", String, nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("name", String),
    Column("surname", String),
    Column("patronymic", String),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)


class User(SQLAlchemyBaseUserTable[int], Base):
    __allow_unmapped__ = True
    id: Mapped[int] = Column(Integer, primary_key=True)
    email: Mapped[str] = Column(String, nullable=False)
    username: Mapped[str] = Column(String, nullable=False)
    hashed_password: Mapped[str] = Column(String, nullable=False)
    name: Mapped[str] = Column(String)
    surname: Mapped[str] = Column(String)
    patronymic: Mapped[str] = Column(String)
    is_active: Mapped[bool] = Column(Boolean, default=True, nullable=False)
    is_superuser: Mapped[bool] = Column(Boolean, default=False, nullable=False)
    is_verified: Mapped[bool] = Column(Boolean, default=False, nullable=False)


class AccessToken(SQLAlchemyBaseAccessTokenTable[int], Base):
    __allow_unmapped__ = True
    id: Mapped[int] = Column(Integer, primary_key=True)
    token: Mapped[str] = Column(String, nullable=False)
    created_at: Mapped[datetime] = Column(TIMESTAMP, default=datetime.utcnow)
    user_id: Mapped[int] = Column(Integer, ForeignKey(user.c.id))
    refresh_token: Mapped[str] = Column(String)
    refresh_created_at: Mapped[datetime] = Column(TIMESTAMP)
