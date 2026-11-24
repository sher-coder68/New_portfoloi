# Khan Sher — Full-Stack Personal Portfolio
### React + Vite + Tailwind CSS + Node.js + Express.js + MongoDB

A modern, high-performance, full-stack personal portfolio and client inquiry management platform built for **Khan Sher** — Machine Learning Developer, Frontend Developer, and AI-Assisted Graphic Designer.

Preserves the sleek **Charcoal-and-Teal** theme, component animations, and responsive layout while adding a complete Node.js/Express backend with MongoDB persistence, input sanitization, rate-limiting, email notifications, and a secure JWT-authenticated Admin Control Center.

---

## 🏛️ Project Architecture

```text
khan-sher-portfolio/
├── frontend/                     # React 19 + JavaScript + Vite + Tailwind CSS
│   ├── public/                   # Static public assets (khan-sher.jpg portrait)
│   ├── src/
│   │   ├── assets/               # Local images & vector graphics
│   │   ├── components/           # Navbar, Hero, About, Education, Skills, Projects, etc.
│   │   ├── data/                 # Centralized portfolio data (projects, bio, courses)
│   │   ├── pages/                # Multi-page routes (Home, About, Education, Admin, etc.)
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── EducationPage.jsx
│   │   │   ├── ExperiencePage.jsx
│   │   │   ├── SkillsPage.jsx
│   │   │   ├── ProjectsPage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── TestimonialsPage.jsx
│   │   │   ├── BlogPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── AdminLoginPage.jsx      # Admin login & initial setup portal
│   │   │   └── AdminDashboardPage.jsx  # Admin message manager & real-time stats
│   │   ├── services/
│   │   │   └── api.js            # Centralized API service for public & admin endpoints
│   │   ├── App.jsx               # Client-side router configuration
│   │   ├── index.css             # Tailwind styling & custom dark scrollbar
│   │   └── main.jsx              # React entry point
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js            # Configured with proxy to http://localhost:5000
│   └── vitest.config.js          # Vitest testing configuration
│
├── backend/                      # Node.js + Express.js + MongoDB
│   ├── config/
│   │   └── db.js                 # Mongoose connection with graceful reconnection
│   ├── controllers/
│   │   ├── authController.js     # Admin login, profile, and initial setup
│   │   └── contactController.js  # Contact submission, pagination, status update, delete
│   ├── models/
│   │   ├── Admin.js              # Admin schema with bcrypt password hashing
│   │   └── Message.js            # Inquiry schema (name, email, subject, message, IP, agent)
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth endpoints with rate limiter
│   │   └── contactRoutes.js      # /api/contact endpoints with rate limiter & sanitization
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Bearer token verification
│   │   ├── validationMiddleware.js # Input sanitization & validator regex checks
│   │   └── errorMiddleware.js    # JSON 404 & centralized error handler
│   ├── utils/
│   │   └── emailService.js       # Nodemailer email notification (with fallback logger)
│   ├── test/
│   │   └── api.test.js           # Automated backend integration tests
│   ├── server.js                 # Express app initialization, CORS, Helmet, routes
│   ├── package.json
│   ├── .env.example              # Sample environment template
│   └── .env                      # Active local environment variables
│
├── package.json                  # Root runner scripts for both frontend and backend
└── README.md
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js** (v18.0.0 or later)
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` OR a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string)

---

### 2. Backend Setup

1. Open your terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=mongodb://127.0.0.1:27017/khan_sher_portfolio
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d

   # Optional: Email Notifications (Gmail, SendGrid, etc.)
   NOTIFICATION_EMAIL=khansher68u@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=
   SMTP_PASS=
   ```
   *(Note: If SMTP is left blank, notifications will log a formatted preview in your server console without crashing)*.

4. Start the backend server:
   ```bash
   npm run dev
   ```
   Backend will run on [http://localhost:5000](http://localhost:5000).

---

### 3. Frontend Setup

1. Open a new terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on [http://localhost:5173](http://localhost:5173). Requests to `/api/*` are automatically proxied to `http://localhost:5000`.

---

## 🔐 Admin Control Center & Inquiry Management

Khan Sher can view and manage incoming client messages through the dedicated Admin Portal:

1. Navigate to [http://localhost:5173/admin/login](http://localhost:5173/admin/login) (or click **Admin Portal** in the website footer).
2. **Initial Setup:** If you are setting up for the first time, click **"Need initial setup? Initialize Admin →"** and register your master admin credentials.
3. Once authenticated with JWT, the **Admin Dashboard** displays:
   - **Real-Time Analytics:** Total Inquiries, Unread Count, Starred Inquiries, and Today's Messages.
   - **Search & Filters:** Instantly search through sender names, subjects, and email addresses. Filter by *Unread* or *Starred*.
   - **Message Management:**
     - Click **Details** to read the full inquiry, view the sender's IP address and submission timestamp.
     - Toggle **Mark as Read / Unread**.
     - Toggle **Star**.
     - **Reply via Email:** Opens your default email client with pre-filled subject and recipient.
     - **Delete:** Permanently remove inquiries from MongoDB.
   - **Logout:** Clears the stored session token safely.

---

## 🌐 REST API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & uptime status |
| `POST` | `/api/contact` | Submit a contact form inquiry (rate-limited, sanitized) |
| `POST` | `/api/auth/login` | Admin login & JWT token generation |
| `POST` | `/api/auth/setup` | Create master admin account (allowed only if 0 admins exist) |

### Protected Endpoints (`Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/auth/me` | Retrieve currently authenticated admin profile |
| `GET` | `/api/contact` | Fetch paginated inquiries with search & filter parameters |
| `GET` | `/api/contact/stats` | Retrieve total, unread, starred, and today's inquiry counts |
| `GET` | `/api/contact/:id` | Fetch single message by ID |
| `PATCH` | `/api/contact/:id` | Update inquiry status (`isRead`, `isStarred`) |
| `DELETE` | `/api/contact/:id` | Permanently delete inquiry from database |

---

## 🧪 Testing

Both frontend and backend include automated test suites:

- **Run Backend Tests:**
  ```bash
  npm run test:backend
  ```
  *(Tests health status, validation rejections, token protection, and 404 handlers via Node's native test runner)*.

- **Run Frontend Tests:**
  ```bash
  npm run test:frontend
  ```
  *(Tests React Router multi-page navigation, modals, category filters, and contact form validation via Vitest)*.

- **Run All Tests:**
  ```bash
  npm test
  ```

---

## 📜 License
Personal Portfolio Project © 2024 Khan Sher. Built with clean code standards, Tailwind CSS, React, and Node.js.
