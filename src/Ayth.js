import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [username, setUsername] = useState("");
    const [picture, setPicture] = useState("");
    const [token, setToken] = useState("");
    const [user, setUser] = useState([]);

    return (
        <AuthContext.Provider value={{ username, setUsername, picture, setPicture, token, setToken, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )

}