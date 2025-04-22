# 🌏 Highlights of Vietnam – Hotel Booking Platform

A modern travel experience platform tailored for international tourists seeking to explore Vietnam. This full-stack web application allows users to browse, book, and manage accommodations, with a dedicated **admin dashboard**, **Google login**, **PayPal integration**, and more.

## 🛠️ Tech Stack

### Frontend
- **ReactJS**
- TailwindCSS
- Redux (for state management)
- Material-UI (for styled components)
- Axios (for API communication)

### Backend
- **ExpressJS**
- NodeJS
- MongoDB 
- PassportJS (Google OAuth)
- Nodemailer (for sending emails)

### Other Integrations
- **Google Login** (OAuth 2.0)
- **PayPal Payment Gateway**
- Email notifications for booking confirmations
- Hosting: AWS / GCP / Azure

---

## ✨ Key Features

### 👤 User Side
- Google authentication for secure login.
- Browse and search available hotels by location, price, and amenities.
- View room details and real-time availability.
- Dynamic pricing by day.
- Secure PayPal payment integration.
- Email confirmation sent upon successful booking.
- Mobile-responsive and multilingual interface.

### 🛠️ Admin Dashboard
- Login via secured admin route.
- Manage hotel listings and room details.
- Set daily room prices and availability.
- Full CRUD operations on rooms & hotels.
- Monitor bookings and send email updates.

---


---

## 🔐 Authentication

- Uses **Google OAuth 2.0** for user authentication.
- Admin route is protected with JWT and role-based access.

---

## 💳 Payments

- **PayPal** integration to handle online payments securely.
- Booking confirmation emails are automatically sent post-payment.

---

## 📬 Email Notifications

- Confirmation and booking detail emails via **Nodemailer**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB (or your preferred DB)
- PayPal developer credentials
- Google OAuth credentials

### Installation

```bash
# Clone the project
cd highlights-of-vietnam

# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install


