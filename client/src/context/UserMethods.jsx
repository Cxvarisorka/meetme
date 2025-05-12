import React, { createContext, useState, useMemo, useCallback, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie'; // You need to install js-cookie to handle cookies
import { AuthContext } from "./AuthContext";


export const UserMethodsContext = createContext();

const API_URL = "http://localhost:3000";

export const UserMethodsProvider = ({ children }) => {
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);

    const uploadProfileImg = useCallback(async (formData) => {
        try {
            // Retrieve the token from cookies
            const token = Cookies.get("token");
    
            // Check if token exists
            if (!token) {
                alert("You must be logged in to upload a profile image.");
                return;
            }
    
            const res = await fetch(`${API_URL}/user/upload-profile`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,  // Send token in Authorization header
                },
                body: formData,
                credentials: "include",  // Ensure cookies are sent with the request
            });
    
            // Handle the response
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || "Error uploading profile image");
                return;
            }

            console.log(data)
    
            // Update user state with the new profile image URL
            setUser((prev) => ({ ...prev, profileImgUrl: data.profileImgUrl }));
        } catch (err) {
            console.error(err);
            alert("An error occurred while uploading the profile image.");
        }
    }, []);

    const value = useMemo(() => ({
        uploadProfileImg
    }), []);

    return (
        <UserMethodsContext.Provider value={value}>
            {children}
        </UserMethodsContext.Provider>
    );
};

