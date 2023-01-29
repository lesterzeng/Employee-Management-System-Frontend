import React from 'react';
import { useNavigate } from 'react-router-dom'

const Header = () => {

    let navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login")
        
    }

    return (
        
                <div class="container-fluid">
            <nav class="navbar navbar-expand-md navbar-light bg-warning">
                <a className="navbar-brand" href="/employees">&nbsp;&nbsp;Online Employee System</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/employees">List of Employees <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/addupdate/-1">Add Employee</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/departments">List of Departments</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" onClick={handleLogout} >Logout</a>
                        </li>
                
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;