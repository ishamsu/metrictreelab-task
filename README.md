Create a full-stack application with React, Express, and Postgres/MongoDB for the below-described requirement.
A file storage application, that lets users login and upload pdf files. Users should be able to see the list of uploaded files he uploaded and download them with a click. If an admin user logs in he should be able to see a list of files from all users with usernames and download them with a click.

Pages required:
Signup
Login
Home (Searchable list of files uploaded - Search by filename)

## Getting Started

First, run the express server from inside `/api` directory:

```
npm start
```

run the development server React:

```
npm start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- add .env inside the directory `/api`
```DB_USER=""
DATABASE_PASSWORD=""
DB_HOST=localhost
PORT=8000
DB_PORT=5432
DB_DATABASE=""
SECRET=""
```





