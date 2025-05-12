import React, { createContext, useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie'; // You need to install js-cookie to handle cookies


export const AuthContext = createContext();

const API_URL = "https://meetme-77tz.onrender.com";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const checkLoggedInUser = async () => {
        const response = await fetch(`${API_URL}/user/verify-token`, {
            method: "POST",
            credentials: "include"  // include cookies automatically
        });

        if (!response.ok) {
            setUser(null);
            return;
        }

        const data = await response.json(); 
        setUser(data);
        navigate("/profile");
    };

    
    useEffect(() => {
        checkLoggedInUser();
    }, []);

    const register = useCallback(async (data) => {
        try {
            const res = await fetch(`${API_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message);

            alert("Registration successful!");
            navigate("/login")
        } catch (err) {
            console.error("Register error:", err.message);
            return { error: err.message };
        }
    }, []);

    const login = useCallback(async (data) => {
        try {
            const res = await fetch(`${API_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                withCredentials: true, 
                credentials: 'include'
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message);

            console.log(result)

            setUser(result);
            navigate("/profile");
        } catch (err) {
            console.error("Login error:", err.message);
            return { error: err.message };
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        Cookies.remove("token");
    }, []);

    const value = useMemo(() => ({
        user,
        login,
        register,
        logout,
        setUser
    }), [user, login, register]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

