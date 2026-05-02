# 🏥 Doctor Appointment & Patient Management System

A full-stack web application designed to streamline clinic operations including patient management, appointment booking, medical records, and doctor workflow automation.

---

## 🚀 Features

### 👨‍⚕️ Doctor Panel

* View today's appointments
* Access patient history
* Add medical records (multi-field exam inputs)
* Auto-save patient data
* Status-based patient tracking:

  * 🟢 Completed (tests done)
  * 🔴 Pending
* Print patient reports

---

### 🧑‍💼 Reception Dashboard

* Book new appointments
* View today's patient list
* Track appointment status in real-time
* Manage patient details

---

### 🧾 Patient Management

* Store complete patient history
* Link records with appointments
* Structured medical data storage
* Easy retrieval of past reports

---

### 🔐 Authentication System

* Secure login system
* Role-based access (Doctor / Receptionist)
* Protected API routes (JWT-based)

---

### 📊 Smart UI/UX Features

* Sidebar navigation (with toggle fix)
* Auto-save form inputs
* Color-coded appointment tracking
* Dynamic dashboard updates

---

### 🔔 Notifications (In Progress)

* Email notifications (setup done, needs config)
* WhatsApp notifications (integration pending)

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Other Tools

* JWT Authentication
* REST APIs

---

## 📂 Project Structure

```
project-root/
│
├── frontend/        # React app
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Backend setup

```
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend setup

```
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

## 📸 Screenshots (Add Later)

* Doctor Dashboard
* Reception Panel
* Patient Record Form
* Appointment List

---

## 📌 Future Improvements

* WhatsApp API integration
* Advanced analytics dashboard
* Multi-clinic support
* Cloud deployment (AWS / Vercel)
* Payment integration

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Somya Jain**

---
