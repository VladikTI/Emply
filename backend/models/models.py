from sqlalchemy import MetaData, Table, Column, Integer, String, ForeignKey

metadata = MetaData()


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
    Column("token_id"),
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
