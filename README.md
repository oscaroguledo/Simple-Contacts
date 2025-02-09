# Simple-Contacts

A simple contacts web application built with **React** for the frontend and **Django** for the backend. The application allows users to manage contacts, including CRUD (Create, Read, Update, Delete) operations.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Backend Setup (Django)](#backend-setup-django)
- [Frontend Setup (React)](#frontend-setup-react)
- [Running the Application Locally](#running-the-application-locally)
- [Deployment](#deployment)

---

## Project Overview

This is a full-stack web application where users can:
- **Add** new contacts with image, name, address, and phone number.
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
   git clone https://github.com/oscaroguledo/Simple-Contacts.git
   cd Simple-Contacts
   ```

---

## Backend Setup (Django)

### Prerequisites

- Python 3.x
- pip (Python package manager)

## Frontend Setup (React)

### Prerequisites

- Node.js (Download and install from [Node.js](https://nodejs.org/))


The React application will now be running at `http://localhost:3000/`.

---

## Running the Application Locally

To run the full application locally:

1. **Ensure both the backend (Django) and frontend (React) are running** on their respective servers.
   ```bash
         chmod +x setup.sh
         ./setup.sh
   ```
   - Backend (Django) runs on: `http://127.0.0.1:8000/`
   - Frontend (React) runs on: `http://localhost:3000/`

2. **Access the application** in your browser by navigating to `http://localhost:3000/`.

---

## Deployment

Deploying an application to production involves multiple steps and can vary based on your tech stack, application architecture, and the cloud provider you choose. Below is a high-level guide on deploying a full-stack application (Django for the backend and React for the frontend) to production using **AWS** (Amazon Web Services) as the cloud platform. The instructions can be easily adapted to other cloud platforms like **GCP** or **Azure**.

### **Step 1: Set Up Your Cloud Environment**

#### 1. **Sign Up for a Cloud Platform**:
   - **AWS**: [AWS Console](https://aws.amazon.com/)
   - **GCP**: [Google Cloud Console](https://console.cloud.google.com/)
   - **Azure**: [Azure Portal](https://portal.azure.com/)

For this guide, I'll assume you're using **AWS**.

#### 2. **Create or Set Up the Necessary Services**:
   - **EC2 (Elastic Compute Cloud)** for hosting your Django backend.
   - **S3 (Simple Storage Service)** for serving static files (e.g., images, CSS, JS for React).
   <!-- - **RDS (Relational Database Service)** for your PostgreSQL or MySQL database.
   - **CloudFront** (optional) for CDN (Content Delivery Network) to serve assets quickly.
   - **Elastic Load Balancer (ELB)** (optional) for load balancing. -->

### **Step 2: Deploy the Backend (Django)**

#### 1. **Create an EC2 Instance**:
   - In the AWS console, create a new EC2 instance.
   - Choose an appropriate instance type (e.g., `t2.micro` for small-scale production, `t2.medium` for larger traffic).
   - Choose an AMI (Amazon Machine Image) such as `Amazon Linux 2` or an Ubuntu server.
   - Add security groups to allow HTTP (port 80) and HTTPS (port 443) traffic.
   - Set up an SSH key to connect to the instance.

#### 2. **Configure Your EC2 Instance**:
   - SSH into the EC2 instance using the private key you generated during the EC2 setup.
   - Update the package list and install necessary software:
     ```bash
     sudo apt update
     sudo apt install python3-pip python3-dev libpq-dev nginx
     sudo apt install python3-venv  # For creating a virtual environment
     ```

#### 3. **Set Up Your Django Project**:
   - Clone your Django project repository onto the EC2 instance.
   - Set up a **virtual environment** and install dependencies:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     pip install -r requirements.txt
     ```
   - Set up your database connection (likely with **AWS RDS** or your local DB).
   - Run migrations and collect static files:
     ```bash
     python manage.py migrate
     python manage.py collectstatic
     ```

#### 4. **Set Up Gunicorn for Serving Django**:
   - Install Gunicorn:
     ```bash
     pip install gunicorn
     ```
   - Run your Django app with Gunicorn:
     ```bash
     gunicorn --workers 3 your_project_name.wsgi:application
     ```

#### 5. **Set Up Nginx to Reverse Proxy Gunicorn**:
   - Configure Nginx to proxy requests to Gunicorn and serve static files. Here is a basic Nginx config:
     ```bash
     sudo nano /etc/nginx/sites-available/your_project
     ```
   - Add the following config:
     ```nginx
     server {
         listen 80;
         server_name your_domain.com www.your_domain.com;

         location / {
             proxy_pass http://127.0.0.1:8000;
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header X-Forwarded-Proto $scheme;
         }

         location /static/ {
             alias /path_to_your_project/static/;
         }

         location /media/ {
             alias /path_to_your_project/media/;
         }
     }
     ```
   - Enable the Nginx configuration:
     ```bash
     sudo ln -s /etc/nginx/sites-available/your_project /etc/nginx/sites-enabled
     sudo systemctl restart nginx
     ```

#### 6. **Set Up SSL (Optional but Recommended)**:
   - Use **Let’s Encrypt** for free SSL certificates.
   - Install Certbot:
     ```bash
     sudo apt install certbot python3-certbot-nginx
     ```
   - Run Certbot to configure SSL:
     ```bash
     sudo certbot --nginx
     ```

### **Step 3: Deploy the Frontend (React)**

#### 1. **Build the React App**:
   - Navigate to your frontend folder and build the production version of your React app:
     ```bash
     npm run build
     ```
   - This will create a `build` folder with all the static files necessary to serve the React app.

#### 2. **Set Up an S3 Bucket**:
   - Create an S3 bucket in the AWS Console to serve the React build files.
   - Set the bucket policy to allow public access to the files.
   - Upload the contents of the `build` folder to the S3 bucket.

#### 3. **Set Up CloudFront (Optional)**:
   - Use **AWS CloudFront** to serve your static React files from S3 for faster delivery.
   - Set CloudFront to point to the S3 bucket as the origin and enable caching.

#### 4. **Update Your DNS**:
   - If using **Route 53** (AWS’s DNS service), create a CNAME record pointing your domain to your CloudFront distribution URL (or S3 URL if you're not using CloudFront).

### **Step 4: Configure Environment Variables**

#### 1. **Backend Environment Variables**:
   - Set environment variables for the Django project such as `SECRET_KEY`, `DEBUG=False`, `DATABASE_URL`, and `ALLOWED_HOSTS`.

#### 2. **Frontend Environment Variables**:
   - Set the API URL in your React app to point to your deployed backend (e.g., `https://your_backend_api.com`).

### **Step 5: Monitor and Maintain**

#### 1. **Use AWS CloudWatch** for monitoring your backend server (EC2) and logging.

#### 2. **Set up backups** for your database (RDS) and S3 (for static files).

#### 3. **Regularly update your application** and dependencies for security patches.

---


### Notes:
- Ensure that you set up **CORS** properly for local development. You can use the `django-cors-headers` library to allow cross-origin requests.
- This is a basic version of the Contacts web application. You can add features like authentication, email notifications, or advanced styling in the future.

