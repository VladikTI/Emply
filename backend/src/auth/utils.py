from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyAccessTokenDatabase

from sqlalchemy.ext.asyncio import AsyncSession

from src.auth.models import User, Company, HR, UserAccessToken, CompanyAccessToken, HRAccessToken
from src.database import get_async_session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)


async def get_company_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, Company)


async def get_hr_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, HR)


async def get_user_access_token_db(session: AsyncSession = Depends(get_async_session)):  #
    yield SQLAlchemyAccessTokenDatabase(session, UserAccessToken)


async def get_company_access_token_db(session: AsyncSession = Depends(get_async_session)):  #
    yield SQLAlchemyAccessTokenDatabase(session, CompanyAccessToken)


async def get_hr_access_token_db(session: AsyncSession = Depends(get_async_session)):  #
    yield SQLAlchemyAccessTokenDatabase(session, HRAccessToken)
