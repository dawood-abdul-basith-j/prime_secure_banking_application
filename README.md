# Prime Secure Bank Management System

A modern, full-stack banking application built with **React** (Frontend) and **Spring Boot** (Backend) using **MySQL** for secure data persistence.

## Features
- **Stateless Authentication**: Secure login/signup using JWT (JSON Web Tokens).
- **Dashboard**: Real-time overview of your balance in **Indian Rupees (₹)** and recent activities.
- **P2P Money Transfer**: Send money to other users using their email or phone number.
- **Split Bill**: Easily request money from friends for shared expenses.
- **Card Management**: Save and manage your virtual debit/credit cards.
- **Profile Customization**: View and edit your personal banking profile.

---

## Tech Stack
- **Frontend**: React.js, Tailwind CSS (or Vanilla CSS), Axios, React Router.
- **Backend**: Java 17+, Spring Boot 3.x, Spring Security, Hibernate/JPA.
- **Database**: MySQL 8.0+.
- **Security**: JWT Authentication, BCrypt Password Hashing, CORS enabled.

---

## Setup Instructions

### 1. Database (MySQL)
- Start **XAMPP** and ensure **MySQL** is running.
- Create a database named `prime_bank_db`.
- The application will automatically create tables on first run.

### 2. Backend (Spring Boot)
- Open the `backend` folder in VS Code/IntelliJ.
- Ensure you have the **Java Extension Pack** installed.
- Open `src/main/java/com/primesecure/bank/BankApplication.java`.
- Click **Run** or press **F5**.
- Ensure the terminal says: `Tomcat started on port 8080`.

### 3. Frontend (React)
- Open a terminal in the `frontend` folder.
- Run `npm install` (only once).
- Run `npm run dev`.
- Open `http://localhost:5173` (or the port shown in the terminal).

---

## Test Credentials
On the first run, a default user is automatically created for testing:
- **Email**: `user@primebank.com`
- **Password**: `Pass1234`
- **Transaction PIN**: `123456`

---

## Detailed Application Flow

### 1. User Onboarding & Security (Signup)
- **Registration**: New users provide their Full Name, Email, Phone Number, Password, and a 6-digit Transaction PIN.
- **Security Layer**: Passwords are encrypted using **BCrypt** before being stored in the MySQL database.
- **Account Generation**: Upon signup, the system automatically generates a unique 10-digit Account Number and initializes a starting balance.

### 2. Authentication & Session Management (Login)
- **Credential Validation**: The system verifies the email and password against the database records.
- **JWT Issuance**: On success, the backend generates a **JSON Web Token (JWT)**.
- **Persistence**: The frontend stores this token in `localStorage`, allowing the user to stay logged in even after refreshing the page.

### 3. Core Banking Operations (Dashboard & Features)
- **Real-Time Dashboard**: Fetches account data using the JWT token to display personalized greetings and balance in **₹**.
- **P2P Transfer**:
    - Users enter the recipient's phone/email and the amount.
    - The system performs an **ACID-compliant transaction**: deducting from the sender and adding to the receiver simultaneously.
- **Split Bill**:
    - Users can request a specific amount from another user.
    - Requests are stored as "Pending" until the other user approves them.
- **Saved Cards**: Store virtual card details securely (last 4 digits shown for security).

### 4. Security & Termination (Logout)
- **Protected Routes**: Every internal page (Transfer, Profile, etc.) checks for a valid JWT. If the token is missing or expired, the user is redirected to the login page.
- **Logout (Termination)**:
    - The user clicks "Logout".
    - The frontend clears the JWT from `localStorage`.
    - The user is immediately redirected to the welcome screen, terminating the secure session.

---

## Technical Overview
- **CORS Architecture**: Cross-Origin Resource Sharing is enabled to allow secure communication between the React frontend (Port 5174) and Spring Boot backend (Port 8080).
- **Stateless Design**: The backend does not store session data; it relies entirely on the JWT provided in the `Authorization` header of every request.
- **Responsive UI**: Built with modern CSS to ensure the banking experience is seamless on both desktop and mobile devices.

---

## Important Notes
- **CORS**: The backend is configured to allow requests from `localhost:5173`, `localhost:5174`, and `127.0.0.1`.
- **JWT**: Tokens are stored in the browser's `localStorage` for session management.
- **Currency**: All transactions and balances are displayed in **₹**.

