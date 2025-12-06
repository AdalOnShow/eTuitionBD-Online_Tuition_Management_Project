# eTuitionBD - Frontend Project Structure

## Overview
eTuitionBD is a modern tuition management platform connecting students with verified tutors in Bangladesh. This is a complete UI-only implementation built with React, Vite, Tailwind CSS, and DaisyUI.

## Technology Stack
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **React Icons** - Icon library

## Project Structure

```
frontend/
├── public/                      # Static assets
├── src/
│   ├── components/             # Reusable components
│   │   └── shared/            # Shared components
│   │       ├── Navbar.jsx     # Main navigation bar
│   │       └── Footer.jsx     # Site footer
│   │
│   ├── layouts/               # Layout components
│   │   ├── MainLayout.jsx     # Public pages layout
│   │   └── DashboardLayout.jsx # Dashboard layout with sidebar
│   │
│   ├── pages/                 # Page components
│   │   ├── public/           # Public pages
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── AllTuitions.jsx    # Browse all tuitions
│   │   │   ├── TuitionDetails.jsx # Single tuition details
│   │   │   ├── AllTutors.jsx      # Browse all tutors
│   │   │   ├── TutorProfile.jsx   # Single tutor profile
│   │   │   ├── Contact.jsx        # Contact page
│   │   │   └── NotFound.jsx       # 404 error page
│   │   │
│   │   ├── auth/             # Authentication pages
│   │   │   ├── Login.jsx     # Login page
│   │   │   └── Register.jsx  # Registration page
│   │   │
│   │   └── dashboard/        # Dashboard pages
│   │       ├── student/      # Student dashboard
│   │       │   ├── MyTuitions.jsx      # Student's posted tuitions
│   │       │   ├── PostTuition.jsx     # Post new tuition
│   │       │   ├── AppliedTutors.jsx   # View tutor applications
│   │       │   ├── Payments.jsx        # Payment history
│   │       │   └── ProfileSettings.jsx # Student profile settings
│   │       │
│   │       ├── tutor/        # Tutor dashboard
│   │       │   ├── MyApplications.jsx  # Tutor's applications
│   │       │   ├── OngoingTuitions.jsx # Active tuitions
│   │       │   ├── RevenueHistory.jsx  # Revenue tracking
│   │       │   └── ProfileSettings.jsx # Tutor profile settings
│   │       │
│   │       └── admin/        # Admin dashboard
│   │           ├── UserManagement.jsx      # Manage users
│   │           ├── TuitionManagement.jsx   # Manage tuitions
│   │           └── ReportsAnalytics.jsx    # Reports & analytics
│   │
│   ├── routes/               # Routing configuration
│   │   └── Routes.jsx        # All route definitions
│   │
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles (Tailwind imports)
│
├── .env.local               # Environment variables (Firebase config)
├── index.html               # HTML template
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── vite.config.js           # Vite configuration
```

## Pages Overview

### Public Pages

#### 1. Home (`/`)
- Hero section with call-to-action
- Statistics showcase
- Feature highlights
- Recent tuitions grid
- Top-rated tutors
- CTA section

#### 2. All Tuitions (`/tuitions`)
- Sidebar with filters (class, subject, location, type)
- Tuition cards with details
- Pagination
- Sort options

#### 3. Tuition Details (`/tuitions/:id`)
- Complete tuition information
- Requirements and schedule
- Student contact info
- Apply button
- Applicant count

#### 4. All Tutors (`/tutors`)
- Filter sidebar
- Tutor cards with ratings
- Search functionality
- Grid layout

#### 5. Tutor Profile (`/tutors/:id`)
- Tutor information and photo
- Education and experience
- Specializations
- Student reviews
- Contact options
- Availability

#### 6. Login (`/login`)
- Email/password form
- Google sign-in option
- Remember me checkbox
- Forgot password link

#### 7. Register (`/register`)
- Toggle between Student/Tutor registration
- Form validation placeholders
- Terms acceptance
- Different fields for tutors

#### 8. Contact (`/contact`)
- Contact form
- Address, phone, email display
- Map placeholder

#### 9. 404 Not Found (`*`)
- Error message
- Back to home button

### Student Dashboard (`/dashboard/student/...`)

#### 1. My Tuitions
- Table of posted tuitions
- Status badges (Active/Closed)
- Applicant count
- Edit/Delete actions

#### 2. Post Tuition
- Comprehensive form
- Subject, class, salary fields
- Location and schedule
- Description textarea

#### 3. Applied Tutors
- List of tutor applications
- Tutor details
- Accept/Reject buttons
- View profile option

#### 4. Payments
- Payment statistics cards
- Payment history table
- Status tracking
- Download receipt option

#### 5. Profile Settings
- Personal information form
- Avatar upload
- Password change section
- Save/Cancel buttons

### Tutor Dashboard (`/dashboard/tutor/...`)

#### 1. My Applications
- Statistics cards
- Applications table
- Status tracking
- View details

#### 2. Ongoing Tuitions
- Active tuition cards
- Student contact info
- Schedule display
- Salary information

#### 3. Revenue History
- Revenue statistics
- Monthly breakdown
- Payment status
- Earnings chart placeholder

#### 4. Profile Settings
- Personal info section
- Professional info section
- Education and experience
- Hourly rate setting

### Admin Dashboard (`/dashboard/admin/...`)

#### 1. User Management
- User statistics
- Filter by role (Student/Tutor)
- User table with actions
- Activate/Deactivate users

#### 2. Tuition Management
- Tuition statistics
- Filter by status
- Approve/Reject tuitions
- Delete option

#### 3. Reports & Analytics
- Key metrics cards
- Chart placeholders (Line, Pie, Bar, Doughnut)
- Recent activity table
- Growth indicators

## Key Features

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Collapsible sidebar on mobile
- Responsive tables and grids

### Navigation
- Sticky navbar with logo
- Role-based menu items
- Mobile hamburger menu
- Dashboard sidebar navigation

### UI Components
- Cards with shadows
- Badges for status
- Tables with actions
- Forms with validation placeholders
- Buttons with icons
- Avatar placeholders
- Statistics cards
- Modal-ready structure

### Color Scheme
- Primary: Blue (#3B82F6)
- Secondary: Green (#10B981)
- Accent: Amber (#F59E0B)
- Success, Warning, Error states
- Consistent throughout

## Running the Project

### Install Dependencies
```bash
cd frontend
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Routes Summary

### Public Routes
- `/` - Home
- `/tuitions` - All Tuitions
- `/tuitions/:id` - Tuition Details
- `/tutors` - All Tutors
- `/tutors/:id` - Tutor Profile
- `/login` - Login
- `/register` - Register
- `/contact` - Contact
- `*` - 404 Not Found

### Student Dashboard Routes
- `/dashboard/student/my-tuitions` - My Tuitions
- `/dashboard/student/post-tuition` - Post Tuition
- `/dashboard/student/applied-tutors` - Applied Tutors
- `/dashboard/student/payments` - Payments
- `/dashboard/student/profile` - Profile Settings

### Tutor Dashboard Routes
- `/dashboard/tutor/applications` - My Applications
- `/dashboard/tutor/ongoing-tuitions` - Ongoing Tuitions
- `/dashboard/tutor/revenue` - Revenue History
- `/dashboard/tutor/profile` - Profile Settings

### Admin Dashboard Routes
- `/dashboard/admin/users` - User Management
- `/dashboard/admin/tuitions` - Tuition Management
- `/dashboard/admin/reports` - Reports & Analytics

## Design Principles

1. **Consistency** - Uniform spacing, colors, and component styles
2. **Accessibility** - Semantic HTML, proper labels, keyboard navigation
3. **Responsiveness** - Works on all screen sizes
4. **User Experience** - Clear CTAs, intuitive navigation, helpful feedback
5. **Visual Hierarchy** - Important elements stand out
6. **Clean Code** - Organized structure, reusable components

## Next Steps (Backend Integration)

When ready to add functionality:
1. Set up Firebase authentication
2. Create backend API endpoints
3. Implement state management (Context API or Redux)
4. Add form validation with React Hook Form
5. Integrate TanStack Query for data fetching
6. Add SweetAlert2 for notifications
7. Implement real-time updates
8. Add payment gateway integration
9. Set up admin controls
10. Add analytics tracking

## Notes

- All data is currently mock/placeholder data
- No authentication logic implemented
- No API calls or backend integration
- Forms don't submit anywhere
- Buttons trigger no actions
- This is purely a UI/UX implementation
- Ready for backend integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
