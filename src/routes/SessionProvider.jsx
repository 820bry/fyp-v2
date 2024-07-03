import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, matchRoutes, useLocation } from "react-router-dom"

import { auth } from '../firebase'

export default function SessionProvider({ children }){

    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const needAuthRoutes = ["/", "/home", "/logging"];

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (needAuthRoutes.includes(pathname) && !user) {
                navigate("/login")
            }
        });
    }, [])

    return children;
}