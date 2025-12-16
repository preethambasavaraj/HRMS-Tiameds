# HRMS-Tiameds

**Human Resource Management System (HRMS)**  
A full-stack web application to manage employee data, roles, attendance, and administrative tasks. This project showcases a complete HR management solution you can build using modern web technologies.

HRMS helps organizations streamline their HR processes such as employee onboarding, profile management, attendance tracking, salary management, and role-based access.

---

## 🧠 Features

✔ User authentication and authorization  
✔ Manage employees (Create, Read, Update, Delete)  
✔ Track departments and roles  
✔ Attendance and status tracking  
✔ Role-based dashboards for Admin/HR/Employee  
✔ Search and filter employee records  
✔ Responsive UI for different user views  

> Note: This is a customizable HRMS template that you can extend with analytics, payroll, leave management, and reporting functions.

---

## 🛠️ Technologies Used

- **Frontend:** React / NextJS / CSS (adjust based on actual code)  
- **Backend:** Node.js / Express.js (or Java / Spring Boot if present — adjust)  
- **Database:** MongoDB / MySQL / PostgreSQL (adjust accordingly)  
- **Authentication:** JWT / Sessions  
- **APIs:** RESTful endpoints  
- **Version Control:** Git & GitHub

---


---

## 🧩 Backend (API)

The backend folder contains all server-side code, including:

- REST API endpoints  
- Database models/schemas  
- Authentication logic  
- CRUD operations for employees, departments, and users  

## 📁 Project Structure

HRMS-Tiameds/

├── backend/ # Server APIs and business logic

├── frontend/ # Client React/NextJS application

├── .gitignore # Ignored files

├── README.md # Project documentation

To run backend:

```bash
cd backend
npm install                           # install dependencies
cp .env.example .env                  # create env file
# configure DB, secret keys, ports
npm start                             # run server
```

🌐 Frontend (UI)

The frontend folder contains the user interface:

React components/pages

UI for login, dashboard, employee lists

API integration with backend

To run frontend:
```

cd frontend
npm install                           # install dependencies
npm start                             # run app in dev mode

```
Configure your database connection in the backend .env file:

```
DB_HOST=localhost

DB_USER=your_user

DB_PASS=your_password

DB_NAME=hrms

JWT_SECRET=your_jwt_secret

PORT=5000

```


