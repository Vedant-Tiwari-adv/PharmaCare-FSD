# 💊 PharmaCare - MERN Stack Application

Your trusted medicine reminder and prescription storage system.

---

## 📁 Project Structure

```
pharmacare/              ← React Frontend
pharmacare-backend/      ← Express + MongoDB Backend
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

---

## 🖥️ Backend Setup

```bash
cd pharmacare-backend

# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Edit .env with your values:
#    MONGO_URI=mongodb://localhost:27017/pharmacare
#    JWT_SECRET=your_very_secret_key_here

# 4. Start development server
npm run dev

# Server runs on: http://localhost:5000
```

---

## ⚛️ Frontend Setup

```bash
cd pharmacare

# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env
# .env already has: REACT_APP_API_URL=http://localhost:5000/api

# 3. Start development server
npm start

# App runs on: http://localhost:3000
```

---

## 🌐 API Reference

### Auth Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |
| PUT | `/api/auth/password` | Change password | ✅ |
| PUT | `/api/auth/notifications` | Update notification preferences | ✅ |

### Medicine Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/medicines` | Get all medicines | ✅ |
| POST | `/api/medicines` | Add new medicine | ✅ |
| GET | `/api/medicines/:id` | Get single medicine | ✅ |
| PUT | `/api/medicines/:id` | Update medicine | ✅ |
| DELETE | `/api/medicines/:id` | Delete medicine | ✅ |
| POST | `/api/medicines/:id/taken` | Mark as taken | ✅ |
| GET | `/api/medicines/stats/summary` | Dashboard stats | ✅ |

### Prescription Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/prescriptions` | Get all prescriptions | ✅ |
| POST | `/api/prescriptions` | Upload prescription | ✅ |
| GET | `/api/prescriptions/:id` | Get prescription metadata | ✅ |
| GET | `/api/prescriptions/:id/view` | View file in browser | ✅ |
| GET | `/api/prescriptions/:id/download` | Download file | ✅ |
| DELETE | `/api/prescriptions/:id` | Delete prescription | ✅ |

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page |
| Login | `/login` | User login |
| Register | `/register` | Create account |
| Dashboard | `/dashboard` | Overview, charts, schedule |
| Medicines | `/medicines` | Medicine list |
| Add Medicine | `/medicines/add` | Add new medicine |
| Edit Medicine | `/medicines/edit/:id` | Edit existing medicine |
| Prescriptions | `/prescriptions` | Upload & manage prescriptions |
| Profile | `/profile` | Account settings |

---

## 🗃️ MongoDB Models

### User
- `name`, `email`, `password` (hashed), `phone`
- `notifications`: { medicineReminders, expiryAlerts, weeklyReport, emailNotifications }

### Medicine
- `user` (ref), `name`, `dosageTime`, `specificTime`
- `startDate`, `endDate`, `expiryDate`, `notes`
- `takenDates[]`, `takenToday`

### Prescription
- `user` (ref), `filename`, `originalName`, `filePath`
- `mimeType`, `size`, `doctor`, `prescriptionDate`, `uploadDate`

---

## 🔒 Security Features
- Passwords hashed with bcryptjs (salt rounds: 12)
- JWT tokens with 7-day expiry
- Protected routes with middleware
- User-scoped data (users only see their own data)
- File upload validation (type + size)
- Input validation with express-validator

---

## 🚀 Production Deployment

### Backend (e.g. Render / Railway)
```bash
# Set environment variables:
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=strong_random_secret
CLIENT_URL=https://your-frontend.vercel.app
```

### Frontend (e.g. Vercel / Netlify)
```bash
# Set environment variable:
REACT_APP_API_URL=https://your-backend.render.com/api

npm run build
```

---

## 👥 Tech Stack
- **Frontend**: React 18, React Router v6, Recharts, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT + bcryptjs
- **File Upload**: Multer
- **Validation**: express-validator

---

© 2026 PharmaCare. Academic Project – Software Engineering & Project Management (SEPM)
