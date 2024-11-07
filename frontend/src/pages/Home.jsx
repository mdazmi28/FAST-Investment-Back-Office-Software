import { useState, useEffect } from "react";
import api from "../api";
import { Outlet, Link } from "react-router-dom";
import React from 'react'
import Sidebar from "../components/Sidebar";

const Home = () => {
    const [userStatus, setUserStatus] = useState('')

    useEffect(() => {
        if (!userStatus) {
            getUserStatus();
        }
    }, [])

    const getUserStatus = () => {
        api.get('api/user-status/')
            .then((res) => res.data)
            .then((data) => setUserStatus(data))
    }

    return (
        <div className="container-fluid">
    <div className="row">
        <div className="col-2">
            <Sidebar />
        </div>
        <div className="col-10 overflow-y-auto" style={{ height: '100vh' }}>
            <Outlet />
        </div>
        
    </div>
</div>

    )
}

export default Home
