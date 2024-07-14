import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate('/patches');
        window.location.reload();
    }, [navigate]);

    return null;
};

export default Logout;