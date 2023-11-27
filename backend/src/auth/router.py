from fastapi import APIRouter
from fastapi_users import FastAPIUsers

from src.auth.base_config import user_auth_backend, company_auth_backend, hr_auth_backend
from src.auth.manager import get_user_manager, get_company_manager, get_hr_manager
from src.auth.models import User, Company, HR
from src.auth.schemas import UserRead, UserCreate, CompanyCreate, CompanyRead, HRRead, HRCreate

user_authentication = FastAPIUsers[User, int](
    get_user_manager,
    [user_auth_backend],
)

company_authentication = FastAPIUsers[Company, int](
    get_company_manager,
    [company_auth_backend],
)

hr_authentication = FastAPIUsers[HR, int](
    get_hr_manager,
    [hr_auth_backend],
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


router.include_router(
    user_authentication.get_auth_router(user_auth_backend),
    prefix="/user",
)

router.include_router(
    user_authentication.get_register_router(UserRead, UserCreate),
    prefix="/user",
)

router.include_router(
    company_authentication.get_auth_router(company_auth_backend),
    prefix="/company",
)

router.include_router(
    company_authentication.get_register_router(CompanyRead, CompanyCreate),
    prefix="/company",
)

router.include_router(
    hr_authentication.get_auth_router(hr_auth_backend),
    prefix="/hr",
)

router.include_router(
    hr_authentication.get_register_router(HRRead, HRCreate),
    prefix="/hr",
)
