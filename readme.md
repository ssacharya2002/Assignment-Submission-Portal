# Assignment Submission Portal

A Node.js and TypeScript backend system for managing assignment submissions with user and admin functionality.

## Features

- User and Admin authentication
- Assignment submission system
- Assignment review system (accept/reject)
- MongoDB integration
- JWT-based authentication
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ssacharya2002/Assignment-Submission-Portal 
   ```
2. ```bash
   cd Assignment-Submission-Portal
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/assignment-portal
   JWT_SECRET=your-secret-key
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### User Endpoints
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/admins` - Get all admins

### Admin Endpoints
- `POST /api/admins/register` - Register a new admin
- `POST /api/admins/login` - Admin login

### Assignment Endpoints
- `POST /api/assignments/upload` - Upload an assignment
- `GET /api/assignments` - Get assignments (admin only)
- `POST /api/assignments/:id/accept` - Accept an assignment
- `POST /api/assignments/:id/reject` - Reject an assignment

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```