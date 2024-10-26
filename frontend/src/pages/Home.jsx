import { useState, useEffect } from "react";
import api from "../api";
import { Outlet, Link } from "react-router-dom";




import React from 'react'

const Home = () => {
    return (
        <div className="container-fluid">
            <div className="row">

                <nav className="col-md-3 col-lg-2 d-md-block sidebar collapse">
                    <div className="position-sticky pt-3">
                        <h2 className="h4 px-3 pb-3 border-bottom">MyDashboard</h2>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                
                                    <i className="bi bi-bar-chart-line me-2"></i>
                                    <Link to={`overview`}>Overview</Link>
                               
                            </li>
                            <li className="nav-item">

                                <i className="bi bi-people me-2"></i>
                                <Link to={`users`}>Users</Link>

                            </li>
                            <li className="nav-item">
                                
                                    <i className="bi bi-cart me-2"></i>
                                    Orders
                                
                            </li>
                            <li className="nav-item">
                                
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    Alerts
                                
                            </li>
                            <li className="nav-item">
                               
                                    <i className="bi bi-gear me-2"></i>
                                    Settings
                               
                            </li>
                        </ul>
                        <hr />
                        <div className="px-3">

                            <i className="bi bi-box-arrow-right me-2"></i>
                            <Link to={`logout`}>Logout</Link>

                        </div>
                    </div>
                </nav>


                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Home