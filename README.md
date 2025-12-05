# 🎉 Event Booking System – MERN Stack

A full-stack event booking platform with authentication, user dashboard, admin panel, event management, and theming.

---

## 🛠️ **Tech Stack**

### 🖥️ Frontend

- React (Vite)
- React Router
- Axios
- Context API
- CSS (Responsive)

### 🗄️ Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
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
- ✔️ Remove deleted event references from bookings

#### **Users**

- ✔️ View events
- ✔️ Book events
- ✔️ View personal bookings
- ✔️ Prevent duplicate booking

#### **Guests**

- ✔️ View upcoming events

---

### 💾 **Database (MongoDB)**

- ✔️ User schema
- ✔️ Event schema
- ✔️ Booking schema
- ✔️ Data validation
- ✔️ Model relationships

---

### 🎨 **Frontend UI**

- ✔️ Fully responsive
- ✔️ Light & dark mode toggle
- ✔️ Hero section with CTA
- ✔️ Event cards with hover effects
- ✔️ Admin dashboard
- ✔️ User dashboard
- ✔️ Loading spinner
- ✔️ Error messages
- ✔️ Clean modern visuals
- ✔️ Password visibility toggle

---

## 🛠️ **Setup Instructions**

### 1️⃣ Clone the Repository

---

## 🔧 **Backend Setup**

### 2️⃣ **Install Dependencies**

### 3️⃣ **Create `.env` File**

Inside **backend/** create:
MONGO_URI=mongodb://localhost:27017/event-booking-system
JWT_SECRET=my_secret_key
PORT=5000

### 4️⃣ **Start Backend**

cd backend
npm run dev
Backend runs at:  
👉 http://localhost:5000

---

## 💻 **Frontend Setup**

### 5️⃣ Install Dependencies

npm install

### 6️⃣ Start Frontend

cd frontend
npm run dev
Frontend runs at:  
👉 http://localhost:5173

---

# 🔗 **API Endpoints**

### 🔐 **Auth Routes**

Method Endpoint Description

POST /api/auth/signup Register user
POST /api/auth/login Login user
PUT /api/auth/promote/:id Promote user to admin

---

### 🗓️ **Event Routes**

Method Endpoint Description

GET /api/events Get all events
POST /api/events Create event (Admin only)
PUT /api/events/:id Update event
DELETE /api/events/:id Delete event

---

### 🎟️ **Booking Routes**

Method Endpoint Description

POST /api/bookings/:eventId Book event
GET /api/bookings/user Get user bookings
GET /api/bookings Admin: all bookings

---

# 👤 **Developer**

**Esubalew**  
Codveda Technology Intern

🔗 GitHub: https://github.com/esubaleww  
🔗 LinkedIn: https://www.linkedin.com/in/esuk

---

## 📌 **Notes**

- README will be updated as more features are added.
