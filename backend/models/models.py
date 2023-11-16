from sqlalchemy import MetaData, Table, Column, Integer, String, TIMESTAMP, ForeignKey, Boolean

metadata = MetaData()

auth = Table(
    "auth",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("oauth_name", String, nullable=False),
    Column("access_token", String, nullable=False),
    Column("expires_at", Integer),
    Column("refresh_token", String, nullable=False),
    Column("account_id", String, nullable=False),
    Column("account_email", String, nullable=False),
    Column("token_expire_date", TIMESTAMP, nullable=False),
    Column("refresh_expire_date", TIMESTAMP, nullable=False),
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
    Column("token_id", Integer, ForeignKey("auth.id")),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)

company = Table(
    "company",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("username", String, nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("name", String),
    Column("token_id"),
)

hr = Table(
    "hr",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("username", String, nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("name", String),
    Column("surname", String),
    Column("patronymic", String),
    Column("company_id", Integer, ForeignKey("company.id")),
    Column("token_id"),
)
