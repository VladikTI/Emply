from typing import Optional

from fastapi_users import schemas
from pydantic import EmailStr


class UserRead(schemas.BaseUser[int]):
    id: int
    email: EmailStr
    name: Optional[str]
    surname: Optional[str]
    patronymic: Optional[str]
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False


class CompanyRead(schemas.BaseUser[int]):
    id: int
    email: EmailStr
    name: Optional[str]
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False


class HRRead(schemas.BaseUser[int]):
    id: int
    email: EmailStr
    name: Optional[str]
    surname: Optional[str]
    patronymic: Optional[str]
    company_id: int
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    password: str
    name: Optional[str]
    surname: Optional[str]
    patronymic: Optional[str]
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False


class CompanyCreate(schemas.BaseUserCreate):
    email: EmailStr
    password: str
    name: Optional[str]
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False


class HRCreate(schemas.BaseUserCreate):
    email: EmailStr
    password: str
    name: Optional[str]
    surname: Optional[str]
    patronymic: Optional[str]
    company_id: int
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False

