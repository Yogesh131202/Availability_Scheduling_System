# Availability_Scheduling_System
Availability Scheduling System is a web application that allows users to submit their availability for scheduling purposes, and provides an admin interface to view and manage all user availabilities.

## Features
- User Availability Submission: Users can submit their available times, including start and end times for a specific date.
- Admin Dashboard: Admins can view the availability of all users in a centralized interface.
- Authentication: User authentication and token-based authorization.

## Tech Stack
- Frontend: React.js, Material-UI, React-Calendar
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Token)
- API Client: Axios
  
## Installation and Setup
**Prerequisites**

- Node.js (v14 or above)
- MongoDB (local or hosted)


**Steps to Run Locally**
Clone the Repository

```bash
git clone https://github.com/Yogesh131202/Availability_Scheduling_System.git
cd Availability_Scheduling_System
```
**Install Dependencies**

**Install both frontend and backend dependencies:**

```bash
# In the root directory, install backend dependencies:
npm install


# Navigate to the frontend directory and install frontend dependencies:
cd frontend
npm install
Set Up Environment Variables
```

In the root of the project, create a .env file and add the following environment variables:

```bash
MONGO_URI=<your_mongo_db_uri>
```
**Run the Application**

You can run both the backend and frontend concurrently using the following command:

```bash
npm start
The backend server will start at http://localhost:3002, and the frontend React app will start at http://localhost:3000.
```

## Usage
- User Flow: A user logs in, selects a date, enters start and end times for availability, and submits the form.
- Admin Flow: Admin logs in and views all user availabilities on a centralized dashboard.
  
## Project Structure
```bash
Availability_Scheduling_System/
├── client/                   # React frontend
├── controllers/              # Backend controllers
├── models/                   # Mongoose models
├── routes/                   # Express routes
├── server.js                 # Express server entry point
└── .env                      # Environment variables (not included in repo)
```
##Contributing
Feel free to open issues or create pull requests. Contributions are welcome!
