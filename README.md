# 🎉 Event Booking System – MERN Stack

A full-stack event booking platform with authentication, user dashboard, admin panel, event management, and theming (light/dark mode).

---

## 🛠️ Tech Stack

### **Frontend**

- React (Vite)
- React Router
- Axios
- Context API (Auth)
- CSS3 (Mobile Responsive)

### **Backend**

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- CORS

---

## 🚀 Features (Completed)

### 🔐 **Authentication & Authorization**

- ✔️ User Registration
- ✔️ Login with JWT
- ✔️ Admin & User roles
- ✔️ Protected routes
- ✔️ Persist login using localStorage
- ✔️ Error handling & UI messages

---

### 🗓️ **Event Management**

#### **Admin**

- ✔️ Create events
- ✔️ Edit events
- ✔️ Delete events
- ✔️ View all bookings
- ✔️ Promote users to admin

#### **Users**

- ✔️ View upcoming events
- ✔️ Book events
- ✔️ See personal bookings
- ✔️ Cannot book the same event twice

---

### 💾 **Database (MongoDB)**

- ✔️ User schema
- ✔️ Event schema
- ✔️ Booking schema
- ✔️ Validation
- ✔️ Proper model relationships

---

### 🎨 **Frontend UI**

- ✔️ Fully responsive
- ✔️ Light & dark mode toggle
- ✔️ Hero section
- ✔️ Event cards
- ✔️ Admin dashboard
- ✔️ User dashboard
- ✔️ Loading spinner
- ✔️ Error messages
- ✔️ Clean & modern visuals

---

## 🛠️ Setup Instructions

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/esubaleww/event-booking-system.git
cd event-booking-system
🛠️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/esubaleww/event-booking-system.git
cd event-booking-system

2️⃣ Backend Setup
cd backend
npm install


Create .env inside backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


Start backend:

npm start

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


Default URLs:

Frontend: http://localhost:5173

Backend: http://localhost:5000

🔗 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login user
PUT	/api/auth/promote/:id	Promote to admin
Event Routes
Method	Endpoint	Description
GET	/api/events	Get all events
POST	/api/events	Create event (Admin)
PUT	/api/events/:id	Update event
DELETE	/api/events/:id	Delete event
Booking Routes
Method	Endpoint	Description
POST	/api/bookings/:eventId	Book an event
GET	/api/bookings/user	User bookings
GET	/api/bookings	Admin: all bookings
👤 Developer

Esubalew
Codveda Technology Intern

🔗 GitHub: https://github.com/esubaleww

🔗 LinkedIn: https://www.linkedin.com/in/esuk

📌 Notes

This README will be updated if new features are added.
```
