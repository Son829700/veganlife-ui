import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function OAuth2RedirectHandler() {

    const navigate = useNavigate();
    const location = useLocation();
    const { fetchUser } = useAuthContext() || {};

    useEffect(() => {
        const params = new URLSearchParams(location.search);
         const token = params.get("appToken");
      const googleToken = params.get("googleToken");
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("googleToken", googleToken);
            const decodedToken = jwtDecode(token);
            localStorage.setItem("username", decodedToken?.sub);
            if (fetchUser) {
                fetchUser();
                toast.success("Đăng nhập thành công!")
            }
            navigate("/");
        } else {
            console.error("No access token found in the URL!");
            navigate("/login?error=oauth2");
        }
    }, [location, navigate, fetchUser]);

    return <p>Redirecting...</p>;
}
