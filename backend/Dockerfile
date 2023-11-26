FROM python:3.12.0

WORKDIR /backend

COPY requirements.txt /backend
RUN pip install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

COPY . /backend







