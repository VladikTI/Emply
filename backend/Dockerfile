FROM python:3

WORKDIR /backend

#
COPY ./requirements.txt /backend/requirements.txt

#
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

RUN apt-get update && apt-get install -y postgresql postgresql-contrib


#
COPY ./app /backend/app

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=vacation
#
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]

EXPOSE 3000