# 📊 Finance Dashboard Backend

## 📌 Overview

This project is a backend system for a finance dashboard that manages users, financial records, and provides summary analytics with **Role-Based Access Control (RBAC)**.

The system follows clean architecture principles with proper separation of concerns using routes, controllers, services, and middleware layers.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* UUID
* In-memory storage

---

## 📁 Project Structure

```
src/
 ├── routes/
 ├── controllers/
 ├── services/
 ├── middleware/
 ├── models/
 ├── store/
 ├── index.js
 └── app.js
```

---

## 🧠 Design Approach

* Routes → API endpoints
* Controllers → request/response handling
* Services → business logic
* Store → in-memory database

RBAC is implemented using middleware for centralized control.

---

## ⚙️ Setup Instructions

```bash
git clone <your-repo-link>
cd finance-dashboard-backend
npm install
node src/index.js
```

Server: `http://localhost:3000`

---

## 🔐 Authentication

JWT-based authentication.

```
Authorization: Bearer <token>
```

---

## 📊 API Endpoints

---

### 👤 Users (Admin Only)

```
POST   /api/users
GET    /api/users
PATCH  /api/users/:id/status
```

---

### 💰 Financial Records

#### 🔹 Get Records (Advanced)

```
GET /api/records
```

#### ✅ Features:

* **Pagination**

```
/api/records?page=1&limit=10
```

* **Filtering**

```
/api/records?type=income
/api/records?category=Salary
/api/records?date=2026-03
```

* **Search**

```
/api/records?search=grocery
```

👉 Search works on:

* category
* note

---

#### 🔹 Create Record

```
POST /api/records
```

---

#### 🔹 Update Record

```
PUT /api/records/:id
```

---

#### 🔹 Delete Record (Soft Delete)

```
DELETE /api/records/:id
```

---

### 📊 Dashboard

```
GET /api/dashboard/summary
```

Includes:

* Total Income
* Total Expense
* Net Balance
* Category-wise totals
* Recent transactions
* Monthly trends

---

## 🔐 RBAC (Role-Based Access Control)

| Role    | Access                      |
| ------- | --------------------------- |
| Viewer  | Read only                   |
| Analyst | Read + Dashboard            |
| Admin   | Full CRUD + User Management |

---

## ✨ Key Features

* 🔐 JWT Authentication
* 🛡️ RBAC
* ⚡ Rate Limiting (100 req / 15 min)
* 🔎 Search + Filtering + Pagination
* 🧹 Soft Delete
* 📊 Analytics Aggregation
* ⚠️ Global Error Handling

---

## ⚠️ Notes

* In-memory database (no persistence)
* Data resets on restart
* Simplified authentication

---

## ✨ Future Improvements

* Add MongoDB
* Add Swagger docs
* Add caching
* Improve search performance

---

## ✅ Conclusion

This project demonstrates:

* Clean architecture
* Secure API design
* Advanced querying (pagination + filtering + search)
* Real-world financial analytics

---
