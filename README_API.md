#  Finance Dashboard API Documentation

This API provides backend support for a finance dashboard system with **User Management**, **Financial Records**, and **Analytics Dashboard** using **JWT Authentication** and **Role-Based Access Control (RBAC)**.

---

## 🔐 Authentication

The API uses **JWT-based authentication**.

### 1. Login

```
POST /api/users/login
```

**Request Body:**

```json
{
  "email": "admin@example.com",
  "id": "admin-123"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

---

### 2. Authorization

Include the token in headers:

```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

---

### 👤 1. User Management (Admin Only)

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | /api/users            | Create a new user        |
| GET    | /api/users            | Get all users            |
| PATCH  | /api/users/:id/status | Activate/Deactivate user |

---

### 💰 2. Financial Records

#### 🔹 Get Records

```
GET /api/records
```

**Supports:**

* Pagination → `?page=1&limit=10`
* Filtering → `?type=income&category=Salary&date=2026-03`
* Search → `?search=grocery`

---

#### 🔹 Create Record (Analyst/Admin)

```
POST /api/records
```

---

#### 🔹 Update Record (Admin)

```
PUT /api/records/:id
```

---

#### 🔹 Delete Record (Soft Delete - Admin)

```
DELETE /api/records/:id
```

---

### 📊 3. Dashboard Summary (Analyst/Admin)

```
GET /api/dashboard/summary
```

**Returns:**

* Total Income
* Total Expense
* Net Balance
* Category-wise totals
* Recent Transactions
* Monthly Trends

---

## ✨ Key Features

* 🔐 JWT Authentication
* 🛡️ Role-Based Access Control (RBAC)
* ⚡ Rate Limiting (100 requests / 15 minutes)
* 🧹 Soft Delete Support
* 🔎 Search, Filtering & Pagination
* 📊 Dashboard Analytics
* ⚠️ Centralized Error Handling

---

## 🧪 Testing

Run automated tests:

```
npm test
```

---

## ⚠️ Notes

* Uses **in-memory storage** (data resets on restart)
* Authentication is simplified (mock-based)
* Designed for backend architecture demonstration

---

## 🏁 Conclusion

This API demonstrates:

* Clean backend architecture
* Secure authentication & authorization
* Scalable service-based design
* Real-world financial data processing

---
