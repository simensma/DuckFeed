# DuckFeed
DuckFeed is a system allowing for submissions of records of duck feeding events.

The project is structured as two separate apps, a frontend written in React (`frontend/` folder), and backend written in Python (Django) (`backend/` folder), and is hosted on Heroku.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [`node.js`](https://nodejs.org/en/)
* You have installed `python3`, `pip`, and your favorite virtual environment tool
* heroku cli if you want to deploy it to heroku

## Get Started

### Frontend
1. Make sure you're in the frontend folder `cd frontend`
2. install all dependencies `npm install`
3. add a `.env` file with the following properties:

`.env`

```
REACT_APP_API_URL=http://localhost:<port_of_backend>
```

### Backend
1. Make sure you're in the backend folder `cd backend`
2. Activate your virtual env
2. install all dependencies `pip install -r requirements.txt`
3. add a `.env` file with the following properties:

`.env`

```
DATABASE_URL=sqlite:///db.sqlite3
IS_DEV_ENV=true
DJANGO_SECRET_KEY=<CREATE_A_SECRET_KEY>
```

## Development


### Frontend
To run the project locally run

`npm start`

To deploy the frontend to heroku, run

`git subtree push --prefix backend <branch> master` where branch is the branch tracking your heroku frontend project.

### Backend
To run the project locally, run

`./manage.py runserver localhost:<port>`


## Contact

If you want to contact me, get in touch at https://smaaberg.com
