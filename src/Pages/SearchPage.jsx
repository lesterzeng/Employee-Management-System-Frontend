import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SearchPage = () => {


    const { id } = useParams()

    let navigate = useNavigate()

    const [employeesList, setEmployeesList] = useState([])
    const [searchInput, setSearchInput] = useState('');

    const token = localStorage.getItem("access_token");
    const headers = new Headers({
        'Authorization': `Bearer ${token}`
    });

    useEffect(() =>
    {

        const fetchUsers = () => {
        fetch(process.env.REACT_APP_EMPLOYEE_URL, {
            method: "GET",
            headers: headers
        })
            .then(res =>
            {
                if (!res.ok)
                {
                    throw new Error('Unauthorized');
                }
                return res.json();
                
            })
            .then(data =>
            {
                setEmployeesList(data);
            })
            .catch(error =>
            {
                console.error(error);
            });}

        fetchUsers()

    }, [])

    const handleDelete = (id, firstName) =>
    {

        try
        {
            if (window.confirm(`Are you sure you want to delete employee: ${firstName}?`))
            {
                fetch(process.env.REACT_APP_EMPLOYEE_URL + `/${id}`, {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json' },

                })
                    .then((res) => res.json())
                    .then(data =>
                    {
                        setEmployeesList([...employeesList, data])
                        setEmployeesList("")
                    })
            }
        } catch (err)
        {
            toast.error("Error - Employee failed to be deleted.");
        }
    }

    const handleUpdate = (id) =>
    {
        navigate(`/addupdate/${id}`)
    }  

    const handleView = (id) =>
    {
        navigate(`/view/${id}`)
    }



    return (
        <div className='container'>
            
            <ul className='list'>
                <br></br>
                <br></br>
                <input type="text"
                    placeholder='Search...'
                    className="search"
                    onChange={(e)=> setSearchInput(e.target.value)}></input>
                <div>
                    <div className='container'>
                        <br />
                        <table className="table table-sm table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employeesList.filter((value)=> {
                                        if (searchInput == ""){
                                            return null
                                        } else if (value.firstName.toLowerCase().includes(searchInput.toLowerCase())
                                            || value.lastName.toLowerCase().includes(searchInput.toLowerCase()))
                                            return value
                                        }).map((item) =>
                                        <tr key={item.id}>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <button onClick={() => handleUpdate(item.id)} className="btn btn-info">Update</button>
                                                <button onClick={() => handleDelete(item.id, item.firstName)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                                <button onClick={() => handleView(item.id)} className="btn btn-info" style={{ marginLeft: "10px" }}>View</button>
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </ul>
        </div>
    );
};

export default SearchPage;