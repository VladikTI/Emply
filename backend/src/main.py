from fastapi import FastAPI

from src.auth.router import router as router_auth

app = FastAPI(
    title="Emply",
    version="1.4.8.8"
)

app.include_router(router_auth)
