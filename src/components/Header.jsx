import React from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    let navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login")
        
    }



    return (
        
                <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-light bg-warning">
                <a className="navbar-brand" href="/employees">&nbsp;&nbsp;Online Employee System</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/employees">List of Employees <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/departments">List of Departments</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/addupdate/-1">Add Employee</a>
                        </li>
                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                            onChange={e => setSearchTerm(e.target.value)} />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/search">Search Employee</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={handleLogout} >Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;