# Работа с модулем backend

## Запуск модуля
Сперва надо запустить контейнера по приложенному 'docker-compose.yml' командой 
###  `docker-compose up -d`
###
Необходимо дождаться запуска контейнеров и начала работы PostgreSQL, а после этого выполнить миграции командами 
### `docker exec backend alembic revision --autogenerate`
### `docker exec backend alembic upgrade head`

## Доступ к документации
Документация FastAPI будет доступна по ссылкам [Старая документация](http://localhost:80/docs) и 
[Новая документация](http://localhost/redoc). По моему мнению старая документация удобнее.