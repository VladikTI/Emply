from datetime import datetime, timezone

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyBaseAccessTokenTable
from sqlalchemy import MetaData, Table, Column, Integer, String, ForeignKey, Boolean, TIMESTAMP
from sqlalchemy.orm import Mapped

from src.database import Base

metadata = MetaData()

user_access_token = Table(
    "user_access_token",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("token", String, nullable=False),
    Column("created_at", TIMESTAMP(timezone=True), default=datetime.now(timezone.utc)),
    Column("user_id", Integer, ForeignKey("user.id")),
    Column("refresh_token", String),
    Column("refresh_created_at", TIMESTAMP(timezone=True)),
)

company_access_token = Table(
    "company_access_token",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("token", String, nullable=False),
    Column("created_at", TIMESTAMP(timezone=True), default=datetime.now(timezone.utc)),
    Column("user_id", Integer, ForeignKey("company.id")),
    Column("refresh_token", String),
    Column("refresh_created_at", TIMESTAMP(timezone=True)),
)

hr_access_token = Table(
    "hr_access_token",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("token", String, nullable=False),
    Column("created_at", TIMESTAMP(timezone=True), default=datetime.now(timezone.utc)),
    Column("user_id", Integer, ForeignKey("hr.id")),
    Column("refresh_token", String),
    Column("refresh_created_at", TIMESTAMP(timezone=True)),
)

user = Table(
    "user",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("name", String),
    Column("surname", String),
    Column("patronymic", String),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)

company = Table(
    "company",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("name", String),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)

hr = Table(
    "hr",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("name", String),
    Column("surname", String),
    Column("patronymic", String),
    Column("company_id", Integer, ForeignKey("company.id")),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "user"
    id: Mapped[int] = Column(Integer, primary_key=True)
    email: Mapped[str] = Column(String, nullable=False)
    hashed_password: Mapped[str] = Column(String, nullable=False)
    name: Mapped[str] = Column(String)
    surname: Mapped[str] = Column(String)
    patronymic: Mapped[str] = Column(String)
    is_active: Mapped[bool] = Column(Boolean, default=True, nullable=False)
    is_superuser: Mapped[bool] = Column(Boolean, default=False, nullable=False)
    is_verified: Mapped[bool] = Column(Boolean, default=False, nullable=False)


class Company(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "company"
    id: Mapped[int] = Column(Integer, primary_key=True)
    email: Mapped[str] = Column(String, nullable=False)
    hashed_password: Mapped[str] = Column(String, nullable=False)
    name: Mapped[str] = Column(String)
    is_active: Mapped[bool] = Column(Boolean, default=True, nullable=False)
    is_superuser: Mapped[bool] = Column(Boolean, default=False, nullable=False)
    is_verified: Mapped[bool] = Column(Boolean, default=False, nullable=False)


class HR(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "hr"
    id: Mapped[int] = Column(Integer, primary_key=True)
    email: Mapped[str] = Column(String, nullable=False)
    hashed_password: Mapped[str] = Column(String, nullable=False)
    name: Mapped[str] = Column(String)
    surname: Mapped[str] = Column(String)
    patronymic: Mapped[str] = Column(String)
    company_id: Mapped[int] = Column(Integer, ForeignKey(company.c.id))
    is_active: Mapped[bool] = Column(Boolean, default=True, nullable=False)
    is_superuser: Mapped[bool] = Column(Boolean, default=False, nullable=False)
    is_verified: Mapped[bool] = Column(Boolean, default=False, nullable=False)


class UserAccessToken(SQLAlchemyBaseAccessTokenTable[int], Base):
    __tablename__ = "user_access_token"
    id: Mapped[int] = Column(Integer, primary_key=True)
    token: Mapped[str] = Column(String, nullable=False)
    created_at: Mapped[datetime] = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
    user_id: Mapped[int] = Column(Integer, ForeignKey(user.c.id))
    refresh_token: Mapped[str] = Column(String)
    refresh_created_at: Mapped[datetime] = Column(TIMESTAMP(timezone=True))


class CompanyAccessToken(SQLAlchemyBaseAccessTokenTable[int], Base):
    __tablename__ = "company_access_token"
    id: Mapped[int] = Column(Integer, primary_key=True)
    token: Mapped[str] = Column(String, nullable=False)
    created_at: Mapped[datetime] = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
    user_id: Mapped[int] = Column(Integer, ForeignKey(company.c.id))
    refresh_token: Mapped[str] = Column(String)
    refresh_created_at: Mapped[datetime] = Column(TIMESTAMP(timezone=True))


class HRAccessToken(SQLAlchemyBaseAccessTokenTable[int], Base):
    __tablename__ = "hr_access_token"
    id: Mapped[int] = Column(Integer, primary_key=True)
    token: Mapped[str] = Column(String, nullable=False)
    created_at: Mapped[datetime] = Column(TIMESTAMP(timezone=True), default=datetime.utcnow)
    user_id: Mapped[int] = Column(Integer, ForeignKey(hr.c.id))
    refresh_token: Mapped[str] = Column(String)
    refresh_created_at: Mapped[datetime] = Column(TIMESTAMP(timezone=True))
