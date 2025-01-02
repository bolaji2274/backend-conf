import React, { Children } from 'react'
import { createContext, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
// import axios from 'axios'

const swal = require('sweetalert2')

const AuthContext = createContext()



export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        return localStorage.getItem('authTokens') 
            ? JSON.parse(localStorage.getItem('authTokens')) 
            : null;
    });

    const [user, setUser] = useState(() => {
        return localStorage.getItem('authTokens')
            ? jwtDecode(localStorage.getItem('authTokens'))
            : null;
    });

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});  // Store form errors as an object

    const navigate = useNavigate(); // useNavigate returns the navigate function
    const location = useLocation();
    const loginUser = async (email, password) => {
        try {
            const response = await fetch("https://api-bkrt.onrender.com/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            // Get the page the user tried to access before being redirected to login
            // const from = location.state?.from?.pathname || "/";
            const data = await response.json(); // Extract JSON data from response
            const from = location.state?.from || "/"; // Default to home if no path provided
            if (response.status === 200) {
                setAuthTokens(data);
                const decodeToken = jwtDecode(data.access)
                setUser(decodeToken);
                localStorage.setItem('authTokens', JSON.stringify(data));
                setErrors({});  // Clear previous errors
                // navigate("/dashboard");
                // if (decodeToken.is_admin) {
                //     navigate("/admin/dashboard"); // Redirect to admin dashboard if user is admin
                // } else {
                //     navigate("/customer/dashboard");
                //     console.log(decodeToken.is_admin) // Redirect to customer dashboard for regular users
                // }
                // Determine the redirection path: from protected route path or user-specific dashboard
                if (from) {
                    navigate(from, { replace: true }); // Navigate to the intended path
                } else if (decodeToken.is_admin) {
                    navigate("/admin/dashboard"); // Redirect to admin dashboard if no 'from' path
                } else {
                    navigate("/customer/dashboard"); // Redirect to customer dashboard if no 'from' path
                }
                
                // navigate(from, { replace: true });  // Redirect to the protected page after login
            } else if (response.status === 400) {
                // Handle form field errors for login (e.g. invalid credentials)
                setErrors(data); // Make sure backend returns field errors
            } else {
                swal.fire({
                    title: "Login failed!",
                    text: "Something went wrong.",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            swal.fire({
                title: "Login failed!",
                text: "An error occurred.",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
     
    };
    // Register function with detailed error handling
    const registerUser = async (first_name, last_name, farm_branch_name, email, phone_number, password, password2) => {
        try {
            // https://api-bkrt.onrender.com/api/register/
            const response = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    farm_branch_name,
                    email,
                    phone_number,
                    password,
                    password2,
                }),
            });

            const data = await response.json(); // Extract JSON data from response
            if (response.status === 201) {
                setErrors({});  // Clear any previous errors
                navigate("/login");
                swal.fire({
                    title: "Registration Successful, Login Now",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                 // Trigger sign-up API call here...
                toast.success("A verification email has been sent to your inbox. Please verify to complete registration.");
                
            } else if (response.status === 400) {
                // Capture Django-like form field errors
                setErrors(data); // This `data` should be the error dictionary from Django
            } else {
                swal.fire({
                    title: "Registration failed!",
                    text: "Something went wrong.",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Registration error:', error);
            swal.fire({
                title: "Registration failed!",
                text: "An error occurred.",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }

    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate("/logout"); // Correct usage of navigate
        swal.fire({
                title: "You have been log out",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'bottom-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
    };
    const clearErrors = () => {
        setErrors({});  // Function to clear errors
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        errors,  // Expose form field errors
        clearErrors,  // Expose clearErrors function to reset the error state
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContext

