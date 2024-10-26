import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import api from "./api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";

const useCheckAuthorized = () => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                if (!token) return setIsAuthorized(false);

                const decoded = jwtDecode(token);
                const tokenExpiration = decoded.exp;
                const now = Date.now() / 1000;
               
                if (tokenExpiration < now) {
                    await handleTokenRefresh();
                } else {
                    setIsAuthorized(true);
                }
            } catch (error) {
                console.error("Authorization error:", error);
                setIsAuthorized(false);
            }
        };

        const handleTokenRefresh = async () => {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
            if (!refreshToken) return setIsAuthorized(false);

            try {
                const response = await api.post("/api/token/refresh/", {
                    refresh: refreshToken,
                });

                if (response.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Token refresh error:", error);
                setIsAuthorized(false);
            }
        };

        checkAuthorization();
    }, []);

    return isAuthorized;
};

export default useCheckAuthorized;
