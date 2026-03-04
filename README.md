# Notes Application

## 📌 Step 1: Project Understanding

The Notes Application is a web-based application that allows users to register, login, and manage personal notes securely. Users can create, edit, and delete notes. Session-based authentication is used to protect user data.

## 🏗️ Step 2: Architecture / Approach

The project follows a **Node.js + Express.js** backend architecture with **MongoDB** database storage.

### 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose ORM
* EJS Template Engine
* bcrypt (Password Hashing)
* express-session (Authentication Session)
* connect-mongo (Session Storage)

## 📦 Step 3: Install Packages

Run the following commands to install dependencies:

```bash
npm init -y
npm install express mongoose express-session connect-mongo bcrypt dotenv ejs
npm install nodemon --save-dev
```

## 🔐 Step 4: Authentication Flow

1. User registers with username, email, and password.
2. Password is encrypted using bcrypt hashing.
3. User login is verified by checking credentials.
4. Session is created after successful login.
5. Middleware protects note routes.

## 🚀 Step 5: How to Run the Project

### Clone Repository

```bash
git clone https://github.com/AbubakarStackDev/notes-
cd app_notes
```

### Setup Environment Variables

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection_string
```

### Start Server

```bash
node app.js
```

### Open Browser

Visit:

```
http://localhost:8080
```

## ✅ Step 6: Features

* User Registration and Login
* Secure Password Storage
* Create Notes
* Edit Notes
* Delete Notes
* Session-based Authentication

## 🎯 Step 7: Conclusion

This project demonstrates backend web development using Node.js, MongoDB, and authentication techniques.
