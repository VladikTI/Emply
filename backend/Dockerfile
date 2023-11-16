FROM python:3


COPY . /backend

WORKDIR /backend


RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

RUN apt-get update && apt-get install -y postgresql postgresql-contrib


CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]

CMD ["alembic", "revision", "--autogenerate", "-m", "\"DB Creation\""]

EXPOSE 8000