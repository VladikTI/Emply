FROM python:3

COPY . /backend

WORKDIR /backend


RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

RUN apt-get update && apt-get install -y postgresql postgresql-contrib
