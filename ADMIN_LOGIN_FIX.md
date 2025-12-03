# QUICK FIX: Create Admin Account

## Option 1: Sign Up as Admin (EASIEST)

Instead of using the pre-seeded admin, just sign up with these details:

1. Go to http://localhost:5173/signup
2. Fill in the form:
   - **Full Name:** Admin User
   - **Email:** admin@ecobite.com  
   - **Password:** Admin@123
   - **User Type:** Select "Admin"
   - Fill in other required fields

3. Click "Create Account"

This will create a fresh admin account that you can log in with immediately.

## Option 2: Use Test Credentials

The test endpoint at `http://localhost:3002/api/auth/test-admin` confirms:
- Admin user EXISTS
- Password "Admin@123" is CORRECT
- Password validation PASSES

If login still fails, it's likely a server restart issue.

## Option 3: Restart Everything

1. Stop the server (Ctrl+C)
2. Run: `npm run dev`
3. Wait for both servers to start
4. Try logging in again with:
   - Email: admin@ecobite.com
   - Password: Admin@123

## Debugging

Check the server console for these logs:
```
=== LOGIN REQUEST ===
Request body: { email: 'admin@ecobite.com', password: 'Admin@123' }
Login attempt for: admin@ecobite.com
User found: YES
Password valid: true
```

If you don't see these logs, the new code hasn't loaded yet - restart the server.
