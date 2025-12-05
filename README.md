# React + Vite Project with Full Stack Setup

A modern React application built with Vite and configured with Tailwind CSS, DaisyUI, React Router, React Hook Form, TanStack Query, Firebase Authentication, and SweetAlert2.

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **React Router** - Client-side routing
- **React Hook Form** - Form validation and handling
- **TanStack Query** - Data fetching and caching
- **Firebase** - Authentication
- **SweetAlert2** - Beautiful alerts and modals

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password and Google Sign-in)
3. Copy your Firebase configuration
4. Update `.env.local` with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### 3. Run Development Server

```bash
npm run dev
```

## Project Structure

```
src/
├── components/        # Reusable components
│   └── Navbar.jsx
├── config/           # Configuration files
│   └── firebase.config.js
├── contexts/         # React contexts
│   └── AuthContext.jsx
├── layouts/          # Layout components
│   └── MainLayout.jsx
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── routes/           # Routing configuration
│   ├── Routes.jsx
│   └── PrivateRoute.jsx
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Features

### Authentication (Firebase)
- Email/Password authentication
- Google Sign-in
- Protected routes
- Auth context for global state

### Form Handling (React Hook Form)
- Form validation
- Error handling
- Easy form state management

### Data Fetching (TanStack Query)
- Automatic caching
- Background refetching
- Loading and error states
- Example implementation in Dashboard

### UI Components (Tailwind + DaisyUI)
- Responsive design
- Pre-built components
- Customizable themes
- Utility-first styling

### Alerts (SweetAlert2)
- Success/error notifications
- Confirmation dialogs
- Customizable modals

## Usage Examples

### Using React Hook Form

```jsx
import { useForm } from "react-hook-form";

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Using TanStack Query

```jsx
import { useQuery } from "@tanstack/react-query";

const MyComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myData"],
    queryFn: () => fetch("/api/data").then(res => res.json())
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data}</div>;
};
```

### Using Firebase Auth

```jsx
import { useAuth } from "./contexts/AuthContext";

const MyComponent = () => {
  const { user, signIn, signOut } = useAuth();
  
  return (
    <div>
      {user ? (
        <button onClick={signOut}>Logout</button>
      ) : (
        <button onClick={() => signIn(email, password)}>Login</button>
      )}
    </div>
  );
};
```

### Using SweetAlert2

```jsx
import Swal from "sweetalert2";

const showAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Operation completed successfully"
  });
};
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Tailwind Configuration
Edit `tailwind.config.js` to customize your theme, colors, and plugins.

### DaisyUI Themes
DaisyUI comes with multiple themes. Change the theme in `tailwind.config.js`:

```js
module.exports = {
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
```

## License

MIT
