# base image
FROM python:3.8-alpine
# set a directory for the app
WORKDIR /usr/src/app
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# install dependencies
COPY ./requirements.txt .
RUN \
 apk add --no-cache python3 postgresql-libs libxml2-dev libxslt-dev && \
 apk add --no-cache --virtual .build-deps gcc python3-dev musl-dev postgresql-dev && \
 pip install --upgrade pip && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps
# copy entrypoint.sh
COPY ./entrypoint.sh .
# copy project
COPY . .