# Simple-Contacts

A simple contacts web application built with **React** for the frontend and **Django** for the backend. The application allows users to manage contacts, including CRUD (Create, Read, Update, Delete) operations.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Backend Setup (Django)](#backend-setup-django)
- [Frontend Setup (React)](#frontend-setup-react)
- [Running the Application Locally](#running-the-application-locally)
- [Deployment](#deployment)
- [License](#license)

---

## Project Overview

This is a full-stack web application where users can:
- **Add** new contacts with name, address, and phone number.
- **View** the list of contacts.
- **Update** contact information.
- **Delete** contacts.

The project uses:
- **Django** as the backend to handle the API.
- **React** for the frontend, interacting with the Django API.
- **SQLite** as the database for storing contacts (default with Django).

---

## Technologies Used
- **Backend**: Django, Django REST Framework
- **Frontend**: React, Axios
- **Database**: SQLite (for simplicity)
- **Styling**: Basic CSS for styling
- **Version Control**: Git, GitHub

---

## Cloning the Repository

1. **Clone the repository** by running the following command in your terminal:

   ```bash
   git clone https://github.com/yourusername/contacts-web-app.git
   cd contacts-web-app
   ```

   Replace `yourusername` with your GitHub username.

---

## Backend Setup (Django)

### Prerequisites

- Python 3.x
- pip (Python package manager)

### Steps to Set Up the Backend

1. **Navigate to the backend folder**:
   ```bash
   cd contacts-backend
   ```

2. **Create a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply database migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional for admin access)**:
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the Django server**:
   ```bash
   python manage.py runserver
   ```

The Django API will now be running at `http://127.0.0.1:8000/`.

---

## Frontend Setup (React)

### Prerequisites

- Node.js (Download and install from [Node.js](https://nodejs.org/))

### Steps to Set Up the Frontend

1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```

The React application will now be running at `http://localhost:3000/`.

---

## Running the Application Locally

To run the full application locally:

1. **Ensure both the backend (Django) and frontend (React) are running** on their respective servers.
   - Backend (Django) runs on: `http://127.0.0.1:8000/`
   - Frontend (React) runs on: `http://localhost:3000/`

2. **Access the application** in your browser by navigating to `http://localhost:3000/`.

---

## Deployment

### Backend (Django)

To deploy the Django API to a cloud platform like **Heroku** or **AWS**, follow these instructions:

#### Deploy to Heroku

1. **Install the Heroku CLI**: [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
   
2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create a `Procfile`** in the root of your Django project (if not already created):
   ```txt
   web: gunicorn contacts_backend.wsgi
   ```

4. **Install Gunicorn** (for production server):
   ```bash
   pip install gunicorn
   ```

5. **Create a `requirements.txt`** (if not already created):
   ```bash
   pip freeze > requirements.txt
   ```

6. **Deploy to Heroku**:
   ```bash
   git init
   heroku create
   git push heroku master
   ```

7. **Add a database to Heroku (e.g., Postgres)**:
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

8. **Your Django backend is now live on Heroku**.

#### Deploy to AWS (Using Elastic Beanstalk)

1. **Set up Elastic Beanstalk**:
   Follow this [guide](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html) to deploy your Django app on AWS Elastic Beanstalk.

2. **Configure your application to use AWS services** like RDS for database management.

### Frontend (React)

You can deploy the React frontend to services such as **Netlify**, **Vercel**, or **GitHub Pages**.

#### Deploy to Netlify

1. **Push your React code to GitHub**.
2. **Create a new site on Netlify** and link it to your GitHub repository.
3. **Netlify will automatically build and deploy** your React app.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Notes:
- Ensure that you set up **CORS** properly for local development. You can use the `django-cors-headers` library to allow cross-origin requests.
- This is a basic version of the Contacts web application. You can add features like authentication, email notifications, or advanced styling in the future.

