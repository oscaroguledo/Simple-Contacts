#!/bin/bash

# Backend Setup (Django)

echo "Setting up the backend..."

# Create and activate virtual environment
echo "Creating virtual environment..."
python3 -m venv venv
echo "Activating virtual environment..."
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`

# Install dependencies
echo "Installing backend dependencies..."
pip install -r backend/requirements.txt

# Navigate to the backend directory
echo "Navigating to backend directory..."
cd backend

# Apply database migrations
echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

# Create a superuser (optional)
# echo "Creating superuser (optional)..."
# python manage.py createsuperuser  # Optional, you may remove this line if not required

# Run the Django server
echo "Starting Django server..."
python manage.py runserver &  # Run in the background

# Wait for Django server to start up (adjust time as needed)
sleep 5

# Frontend Setup (React)
echo "Setting up the frontend..."

# Navigate to the frontend directory
cd ../frontend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Start the React development server
echo "Starting React development server..."
npm run start
