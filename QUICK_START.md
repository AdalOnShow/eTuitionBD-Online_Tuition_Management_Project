# eTuitionBD - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📱 Viewing Different Pages

### Public Pages
- **Home**: `http://localhost:5173/`
- **All Tuitions**: `http://localhost:5173/tuitions`
- **Tuition Details**: `http://localhost:5173/tuitions/1`
- **All Tutors**: `http://localhost:5173/tutors`
- **Tutor Profile**: `http://localhost:5173/tutors/1`
- **Login**: `http://localhost:5173/login`
- **Register**: `http://localhost:5173/register`
- **Contact**: `http://localhost:5173/contact`

### Student Dashboard
- **My Tuitions**: `http://localhost:5173/dashboard/student/my-tuitions`
- **Post Tuition**: `http://localhost:5173/dashboard/student/post-tuition`
- **Applied Tutors**: `http://localhost:5173/dashboard/student/applied-tutors`
- **Payments**: `http://localhost:5173/dashboard/student/payments`
- **Profile**: `http://localhost:5173/dashboard/student/profile`

### Tutor Dashboard
- **My Applications**: `http://localhost:5173/dashboard/tutor/applications`
- **Ongoing Tuitions**: `http://localhost:5173/dashboard/tutor/ongoing-tuitions`
- **Revenue**: `http://localhost:5173/dashboard/tutor/revenue`
- **Profile**: `http://localhost:5173/dashboard/tutor/profile`

### Admin Dashboard
- **User Management**: `http://localhost:5173/dashboard/admin/users`
- **Tuition Management**: `http://localhost:5173/dashboard/admin/tuitions`
- **Reports**: `http://localhost:5173/dashboard/admin/reports`

## 🎨 Design Features

### Responsive Design
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

### UI Components Used
- Cards with shadows
- Tables with actions
- Forms with inputs
- Badges for status
- Buttons with icons
- Navigation bars
- Sidebars
- Statistics cards
- Grid layouts

### Color Scheme
- **Primary**: Blue - Main actions and branding
- **Secondary**: Green - Success states
- **Accent**: Amber - Highlights
- **Base**: Neutral - Background and text

## 📂 Key Files

### Layouts
- `src/layouts/MainLayout.jsx` - Public pages layout
- `src/layouts/DashboardLayout.jsx` - Dashboard with sidebar

### Components
- `src/components/shared/Navbar.jsx` - Main navigation
- `src/components/shared/Footer.jsx` - Site footer

### Routes
- `src/routes/Routes.jsx` - All route definitions

### Styling
- `src/index.css` - Tailwind imports
- `tailwind.config.js` - Tailwind configuration

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
daisyui: {
  themes: [
    {
      light: {
        primary: "#YOUR_COLOR",
        secondary: "#YOUR_COLOR",
        accent: "#YOUR_COLOR",
      },
    },
  ],
}
```

### Add New Page
1. Create component in `src/pages/`
2. Add route in `src/routes/Routes.jsx`
3. Add navigation link in Navbar or Sidebar

### Modify Layout
- Edit `src/layouts/MainLayout.jsx` for public pages
- Edit `src/layouts/DashboardLayout.jsx` for dashboard

## 📝 Important Notes

### Current State
- ✅ All UI pages designed and responsive
- ✅ Routing configured
- ✅ Components organized
- ❌ No backend integration
- ❌ No authentication logic
- ❌ No API calls
- ❌ No form submissions
- ❌ No data persistence

### Mock Data
All data displayed is hardcoded for demonstration:
- User profiles
- Tuition listings
- Tutor information
- Payment records
- Statistics

### Next Phase
When ready to add functionality:
1. Set up backend API
2. Implement authentication
3. Add state management
4. Connect forms to backend
5. Implement real data fetching
6. Add payment integration

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Dependencies Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Error
```bash
# Clear cache and rebuild
npm run build -- --force
```

## 📦 Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

Build output will be in `dist/` folder.

## 🎯 Testing Different Roles

To view different dashboard layouts, manually navigate to:
- Student dashboard: `/dashboard/student/...`
- Tutor dashboard: `/dashboard/tutor/...`
- Admin dashboard: `/dashboard/admin/...`

The sidebar will automatically adjust based on the URL path.

## 💡 Tips

1. **Mobile Testing**: Use browser dev tools responsive mode
2. **Component Reuse**: Check existing components before creating new ones
3. **Consistent Styling**: Follow existing patterns for new pages
4. **Icons**: Use react-icons library (already installed)
5. **Forms**: Use DaisyUI form components for consistency

## 📞 Support

For questions or issues:
- Check `PROJECT_STRUCTURE.md` for detailed documentation
- Review existing pages for implementation examples
- Refer to DaisyUI documentation: https://daisyui.com/

## ✨ Features Showcase

### Home Page
- Hero section with gradient background
- Statistics showcase
- Feature cards
- Recent tuitions
- Top tutors
- Call-to-action sections

### Dashboard
- Responsive sidebar
- Role-based navigation
- Statistics cards
- Data tables
- Action buttons
- Status badges

### Forms
- Input validation placeholders
- Dropdown selects
- Textareas
- Checkboxes
- Submit buttons

Happy coding! 🎉
