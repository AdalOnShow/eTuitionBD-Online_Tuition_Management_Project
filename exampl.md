<div align="center">

# 🌟 Model Stack

### Manage your AI models with efficiency and clarity

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://model-stack.web.app/)
[![Client Repo](https://img.shields.io/badge/GitHub-Client-blue?style=for-the-badge&logo=github)](https://github.com/AdalOnShow/Model-Stack-Client-Site)
[![Server Repo](https://img.shields.io/badge/GitHub-Server-blue?style=for-the-badge&logo=github)](https://github.com/AdalOnShow/Model-Stack-Server-Site)

![Home Page](./home.png)

</div>

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%" valign="top">

### Frontend Technologies

| Technology                                                                                                              | Description            |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                     | UI Library (v19)       |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                         | Build Tool (v7)        |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) | Routing (v7)           |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  | Styling Framework (v4) |
| ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)                | Component Library      |
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)             | Authentication         |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)                      | HTTP Client            |
| ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)                   | Carousel/Slider        |
| ![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react&logoColor=white)          | Icon Library           |
| ![Sonner](https://img.shields.io/badge/Sonner-000000?style=for-the-badge)                                               | Toast Notifications    |
| ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-7066E0?style=for-the-badge)                                     | Modal Dialogs          |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)                   | Code Linting           |

</td>
<td width="50%" valign="top">

### Backend Technologies

| Technology                                                                                                              | Description          |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)              | Runtime Environment  |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)          | Web Framework (v5)   |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)                | NoSQL Database       |
| ![Firebase Admin](https://img.shields.io/badge/Firebase_Admin-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) | Token Verification   |
| ![CORS](https://img.shields.io/badge/CORS-Enabled-green?style=for-the-badge)                                            | Cross-Origin Support |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                   | Deployment Platform  |

</td>
</tr>
</table>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Installation](#-installation)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 📃 About the Project

**Model Stack** is a full-stack AI Model Inventory Management platform where
users can create, manage, edit, filter, and purchase AI model entries in a clean
and intuitive interface.

The system is designed for AI learners, developers, and researchers who need a
simple yet powerful dashboard for organizing AI models with metadata like
framework, dataset, use case, and creation details.

Built with a strong focus on usability, authentication, secure operations, and
responsive UI, the platform feels like a simplified version of model hubs such
as **Hugging Face** or **Model Zoo**.

### 🎯 Project Objectives

- Build a complete AI model management platform featuring authentication, CRUD
  operations, filtering, real-time purchase tracking, and user-specific
  dashboards
- **Target Audience:** Developers, students, and AI enthusiasts
- **Deployment:** Client on Firebase Hosting, Server on Vercel

### 📊 Key Metrics

✅ Real-time Purchase Counter  
✅ Multiple Framework Filtering  
✅ Secure CRUD Operations  
✅ Firebase Authentication  
✅ Responsive UI  
✅ Private Routes Protected  
✅ Clean RESTful API Architecture

---

## ✨ Key Features

### 1. 🔐 Authentication System (Firebase)

- Email/Password login
- Google Sign-In
- Auth persistence on reload
- Protected private routes

### 2. 📦 Full CRUD for AI Models

- Add, edit, delete, and browse AI models
- Each model displays name, framework, dataset, use case, description, and image
- Secure update/delete actions (creator-only)

### 3. 🔍 Search & Filter

- Search by model name (case-insensitive)
- Multi-framework filtering (TensorFlow, PyTorch, etc.)
- Dynamic frameworks list fetched from MongoDB
- Backend filtering using MongoDB `$regex` and `$in` operators

### 4. 💳 Model Purchase System

- Purchase models from detail page
- Increments purchase count using MongoDB `$inc`
- Stores purchase records in separate collection
- Updates UI instantly

### 5. 👤 User Dashboards

- **My Models:** Shows all models created by logged-in user
- **My Purchases:** Lists all purchased models with seller and buyer details

### 6. 📱 Responsive Design

- Mobile-friendly card layout
- Desktop table layout
- Consistent styles using shared components

### 7. 🌓 Dark/Light Theme Toggle

- Integrated DaisyUI theme support
- Saved in localStorage
- Applies across entire site

### 8. 🎨 Additional Features

- Custom 404 Page
- Loading Skeletons & Spinners
- Global toast notifications (Sonner)
- Swiper-based homepage slider

---

## 📁 Project Structure

```
Model-Stack/
├── Model-Stack-Client/          # React Frontend
│   ├── src/
│   │   ├── assets/              # Static assets
│   │   ├── components/          # Reusable components
│   │   │   ├── home/           # Home page components
│   │   │   └── ToggleButton/   # Theme toggle
│   │   ├── contexts/           # React Context
│   │   ├── firebase/           # Firebase config
│   │   ├── hooks/              # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useAxios.js
│   │   │   ├── useAxiosSecure.js
│   │   │   └── useTheme.js
│   │   ├── layouts/            # Layout components
│   │   ├── pages/              # Page components
│   │   ├── provider/           # Context providers
│   │   ├── routes/             # Router config
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── public/                 # Public assets
│   ├── .env.local              # Environment variables
│   └── package.json
│
└── Model-Stack-Server/          # Express Backend
    ├── index.js                 # Main server file
    ├── encode.js                # Utility for encoding
    ├── .env                     # Environment variables
    ├── vercel.json              # Vercel config
    └── package.json
```

---

## 📡 API Documentation

### Base URL

```
Production: https://your-server-url.vercel.app
Local: http://localhost:3000
```

### Authentication

Protected routes require Firebase ID token in header:

```
Authorization: Bearer <firebase_id_token>
```

### Endpoints

#### Models

| Method   | Endpoint         | Auth | Description                               |
| -------- | ---------------- | ---- | ----------------------------------------- |
| `GET`    | `/models`        | ❌   | Get all models (supports search & filter) |
| `GET`    | `/models/:id`    | ❌   | Get single model by ID                    |
| `GET`    | `/latest-models` | ❌   | Get 6 latest models                       |
| `GET`    | `/frameworks`    | ❌   | Get list of all frameworks                |
| `POST`   | `/models`        | ✅   | Create new model                          |
| `PATCH`  | `/models/:id`    | ✅   | Update model                              |
| `DELETE` | `/models/:id`    | ✅   | Delete model                              |

#### Purchases

| Method | Endpoint     | Auth | Description            |
| ------ | ------------ | ---- | ---------------------- |
| `GET`  | `/purchases` | ✅   | Get user's purchases   |
| `POST` | `/purchases` | ✅   | Create purchase record |

### Query Parameters

**GET /models**

- `email` - Filter by creator email
- `search` - Search by model name (case-insensitive)
- `frameworks` - Comma-separated framework names

**Example:**

```
GET /models?search=bert&frameworks=TensorFlow,PyTorch
```

### Request/Response Examples

**POST /models**

```json
{
  "name": "BERT Base",
  "framework": "TensorFlow",
  "dataset": "Wikipedia",
  "useCase": "NLP",
  "description": "Pre-trained BERT model",
  "image": "https://example.com/image.jpg",
  "createdBy": "user@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**POST /purchases**

```json
{
  "modelId": "507f1f77bcf86cd799439011",
  "modelName": "BERT Base",
  "purchasedEmail": "buyer@example.com",
  "purchasedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## ⚙️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB account
- Firebase account

### Client Setup

1. **Clone the repository**

```bash
git clone https://github.com/AdalOnShow/Model-Stack-Client-Site
cd Model-Stack-Client-Site/Model-Stack-Client
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the `Model-Stack-Client` directory:

```env
VITE_apiKey
VITE_authDomain
VITE_projectId
VITE_storageBucket
VITE_messagingSenderId
VITE_appId
VITE_measurementId
VITE_SERVER_URL
```

4. **Run the development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

6. **Preview production build**

```bash
npm run preview
```

---

### Server Setup

1. **Navigate to server directory**

```bash
cd Model-Stack-Server
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the `Model-Stack-Server` directory:

```env
DB_USER
DB_PASS
FIREBASE_SERVICE_KEY
PORT
```

4. **Run the server**

```bash
node index.js
```

The server will start on `http://localhost:3000` (or your specified PORT)

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

### Steps to Contribute

1. **Fork the Project**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📬 Contact

**Sharif Adal**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adalonshow/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sharifadal2008@gmail.com)

### 🔗 Project Links

- **Live Demo:** [https://model-stack.web.app/](https://model-stack.web.app/)
- **Client Repository:**
  [Model Stack Client](https://github.com/AdalOnShow/Model-Stack-Client-Site)
- **Server Repository:**
  [Model Stack Server](https://github.com/AdalOnShow/Model-Stack-Server-Site)

---

<div align="center">

Made with ❤️ by [Sharif Adal](https://github.com/AdalOnShow)

⭐ Star this repo if you find it helpful!

</div>
