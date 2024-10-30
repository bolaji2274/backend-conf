import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestNav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">HerdOne</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/features">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pricing">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-success me-2" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-primary" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default TestNav;
