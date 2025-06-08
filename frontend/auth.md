**Build a simple React frontend for authentication with Django backend. Implement the following:**

1.  **Login Page**:

    - Input fields: username, password
    - On successful login (POST to `/api/auth/login/`), save JWT access & refresh token in localStorage.
    - On login, redirect to `/home`.

2.  **Register Page**:

    - Input fields: username, email, password
    - On successful register (POST to `/api/auth/register/`), redirect to login.

3.  **Protected Route**:

    - Use a `<ProtectedRoute>` component/HOC.
    - If JWT access token is not present in localStorage, redirect to `login`.
    - If token exists, allow access to the route (e.g., `/`).

4.  **Logout**:

    - On clicking logout, remove JWT tokens from localStorage and redirect to `/login`.

5.  **Home Screen**:

    - Simple page showing "Welcome, you are logged in".
    - Accessible only after login (protected).

6.  **React Router v6** use routeCOnfig for routing.

7.  Use reduxToolkit/ slice for state mamnegemtn and calling APi

Just update the Frontend .
