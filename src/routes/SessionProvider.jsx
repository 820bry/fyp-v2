import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, matchRoutes, useLocation } from "react-router-dom"

import { auth } from '../firebase'

export default function SessionProvider({ children }){

    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    // const { pathname } = useLocation();
    // const needAuthRoutes = ["/", "/home", "/logging"];

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {

            if (!user) {
                navigate("/login")
                console.log("no user logon");
            } else {
                // testing only
                console.log("session provider: " + user.uid);
            }
        });
    }, [])

    return children;
}