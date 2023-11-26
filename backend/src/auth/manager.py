from typing import Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, IntegerIDMixin

from src.auth.models import User, Company, HR
from src.auth.utils import get_user_db, get_company_db, get_hr_db

SECRET = "SECRET"


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")


class CompanyManager(IntegerIDMixin, BaseUserManager[Company, int]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, company: Company, request: Optional[Request] = None):
        print(f"User {company.id} has registered.")


class HRManager(IntegerIDMixin, BaseUserManager[HR, int]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, hr: HR, request: Optional[Request] = None):
        print(f"User {hr.id} has registered.")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


async def get_company_manager(company_db=Depends(get_company_db)):
    yield UserManager(company_db)


async def get_hr_manager(hr_db=Depends(get_hr_db)):
    yield UserManager(hr_db)
