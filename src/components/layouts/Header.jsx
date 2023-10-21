import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Link to="/" className="navbar-brand mt-2 mt-lg-0">
                        MERN Task App
                    </Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                               <i className="fas fa-home"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create" className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}>
                                <i className="fas fa-pencil"></i> Create
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}