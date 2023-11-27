from fastapi import Depends
from fastapi_users.authentication.strategy.db import AccessTokenDatabase, DatabaseStrategy
from fastapi_users.authentication import CookieTransport, AuthenticationBackend

from src.auth.models import UserAccessToken, CompanyAccessToken, HRAccessToken
from src.auth.utils import get_user_access_token_db, get_company_access_token_db, get_hr_access_token_db

cookie_transport = CookieTransport(cookie_name="bonds", cookie_max_age=3600)


def user_get_database_strategy(
    access_token_db: AccessTokenDatabase[UserAccessToken] = Depends(get_user_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=3600)


def company_get_database_strategy(
    access_token_db: AccessTokenDatabase[CompanyAccessToken] = Depends(get_company_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=3600)


def hr_get_database_strategy(
    access_token_db: AccessTokenDatabase[HRAccessToken] = Depends(get_hr_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=3600)


user_auth_backend = AuthenticationBackend(
    name="db",
    transport=cookie_transport,
    get_strategy=user_get_database_strategy,
)

company_auth_backend = AuthenticationBackend(
    name="db",
    transport=cookie_transport,
    get_strategy=company_get_database_strategy,
)

hr_auth_backend = AuthenticationBackend(
    name="db",
    transport=cookie_transport,
    get_strategy=hr_get_database_strategy,
)
