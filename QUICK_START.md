# Quick Start Guide

## Running the Application

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will be available at `http://localhost:5173`
   - Vite will automatically open it for you

## Available Routes

- **`/`** - Landing page with service listings
- **`/login`** - Login page
- **`/register`** - Registration page

## Features Implemented

✅ **Landing Page**
- Service grid with 6 sample services
- Filter sidebar (Service Type, Price Range, Rating)
- Search bar in header
- Category navigation
- Responsive design

✅ **Login Page**
- Email and password fields
- Form validation
- Remember me checkbox
- Forgot password link
- Link to registration

✅ **Register Page**
- Full name, email, password, confirm password fields
- Comprehensive form validation
- Password strength requirements
- Terms and conditions checkbox
- Link to login

✅ **Shared Components**
- Header with navigation
- Service cards
- Filter sidebar

## Next Steps (Backend Integration)

When the backend is ready:

1. Update `src/pages/Login.jsx`:
   - Replace the setTimeout in `handleSubmit` with actual API call
   - Handle authentication tokens
   - Store user session

2. Update `src/pages/Register.jsx`:
   - Replace the setTimeout in `handleSubmit` with actual API call
   - Handle registration response

3. Add protected routes if needed
4. Implement logout functionality
5. Add user profile management

## Troubleshooting

**Port already in use?**
- Vite will automatically try the next available port
- Check the terminal output for the actual URL

**Styles not loading?**
- Make sure Tailwind CSS is properly configured
- Check that `index.css` imports Tailwind directives

**Icons not showing?**
- Ensure internet connection (Material Symbols loaded from Google Fonts)
- Check browser console for any loading errors

