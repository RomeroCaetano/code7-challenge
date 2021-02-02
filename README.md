# Running application

## **With Docker:**

- Copy .env.sample and change name to .env
- If you want connect a custom database, change .env with connection settings
- Run docker-compose up -d

## **Without Docker:**

- Download Postgres in https://www.postgresql.org/download/
- Copy .env.sample and change name to .env
- Change .env file in project root with connection settings
- inside of backend project folder, run yarn start
- inside of frontend project folder, run yarn start

### Application will be up in localhost:3000 **(API in port 8000)**

# API Docs:

https://documenter.getpostman.com/view/6022894/TW6zJ8MU

# Stack

- **Backend** Express, Typeorm and Typescript
- **Frontend** ReactJS, Antd and Typescript
