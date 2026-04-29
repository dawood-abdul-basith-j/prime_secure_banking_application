# Prime Secure Bank Management System

> [!IMPORTANT]
> **CRITICAL: FOR THE SYSTEM TO WORK:**
> 1. **MySQL MUST BE RUNNING** (Start via XAMPP Control Panel).
> 2. **SPRING BOOT BACKEND MUST BE RUNNING** (Run `BankApplication.java` in VS Code).
> 3. **FRONTEND MUST BE RUNNING** (Run `npm run dev` in the frontend folder).
> 
> **TEST LOGIN CREDENTIALS:**
> - **Email**: `user@primebank.com`
> - **Password**: `Pass1234`
> - **Transaction PIN**: `123456`

---

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

## 🏃 How to Run the Project

Follow these steps in order to start the application:

### Step 1: Start MySQL Database
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **MySQL**.
3. Ensure the background turns **Green** (Port 3306).
4. (Optional) Open `http://localhost/phpmyadmin` and create a database named `prime_bank_db`.

### Step 2: Start the Backend (Java/Spring Boot)
1. Open the `backend` folder in **VS Code**.
2. Open `src/main/java/com/primesecure/bank/BankApplication.java`.
3. Click the **Run** button (above the `main` method) or press **F5**.
4. Check the terminal for: `Tomcat started on port 8080 (http)`.

### Step 3: Start the Frontend (React)
1. Open a new Terminal in the `frontend` folder.
2. Run the command: `npm run dev`
3. Click the link provided in the terminal (usually `http://localhost:5173` or `5174`).

### Step 4: Access the Website
1. Your browser will open the Login page.
2. Use the **Test Credentials** mentioned above to log in.


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

