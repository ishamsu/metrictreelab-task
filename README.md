Create a full-stack application with React, Express, and Postgres/MongoDB for the below-described requirement.
A file storage application, that lets users login and upload pdf files. Users should be able to see the list of uploaded files he uploaded and download them with a click. If an admin user logs in he should be able to see a list of files from all users with usernames and download them with a click.

Pages required:
* Signup
* Login
* Home (Searchable list of files uploaded - Search by filename)

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

* React.js
* Express
* PostgreSQL

#### add .env inside the directory `/api` :-

```DB_USER=""
DATABASE_PASSWORD=""
DB_HOST=localhost
PORT=8000
DB_PORT=5432
DB_DATABASE=""
SECRET=""
```
#### SQL Query  for creating table :-

```CREATE TABLE user_table (
  uid SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  date_created TIMESTAMP,
  isadmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE data (
  did SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  author VARCHAR(100),
  master_id INT REFERENCES user_table(uid),
  date_created TIMESTAMP
);

```

#### Create admin / insert  user as admin into user_table :-
login with deafult admin credential-
 * *username*: **admin**
 * *passowrd*: **1234567**
 
 **After logged in you can change the username,password if needed.*

```
INSERT INTO user_table (username,password,isadmin,date_created)
VALUES('admin','$2b$08$UKeEkcGxKdMsXk0.6jrddObl57idXFqEHJ1rwOcigo5une4o1ALm2','true',NOW());
```






