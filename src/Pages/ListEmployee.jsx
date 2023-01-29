import React,{useState, useEffect, useRef} from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'


const ListEmployee = () => {

    let navigate = useNavigate()

    const [employeesList, setEmployeesList] = useState([])

    useEffect(() =>
    {

        fetch(process.env.REACT_APP_EMPLOYEE_URL)

        .then(res => res.json())
        .then(data =>
        {
            setEmployeesList(data)
        })
    }, [employeesList])

    const handleAdd = () => {
        navigate("/addupdate/-1")
    }

    const handleUpdate = (id) => {
        navigate(`/addupdate/${id}`)
    }    
    
    const handleDelete = (id,firstName) => {

        try {
           if(window.confirm(`Are you sure you want to delete employee: ${firstName}?`)){
            fetch(process.env.REACT_APP_EMPLOYEE_URL + `/${id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                
            })
                .then((res) => res.json())
                .then(data =>
                {
                    setEmployeesList([...employeesList, data])
                    setEmployeesList("")
                })}
        } catch (err) {
            toast.error("Error - Employee failed to be deleted.");
        }
        
    }

    const handleView = (id) => {
        navigate(`/view/${id}`)
    }

    const handleViewDepartment = () => {
        navigate(`/departments`)
    }

    return (
        <div>
            &nbsp;<h2 className='text-center'>List of Employees</h2>
            <br />
            <div className='container'>
                <div className='row col-md-6 offset-md-3'>
                    <button className="btn btn-success" onClick={handleAdd}>Add Employee</button>
                </div>
               <br></br>
                <div className='row col-md-6 offset-md-3'>
                    <button className="btn btn-primary" onClick={handleViewDepartment}>View Departments</button>
                </div>
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
                            employeesList.map((item)=> 
                            <tr key = {item.id}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>               
                                    <td>
                                        <button onClick={()=>handleUpdate(item.id)} className="btn btn-info">Update</button>
                                        <button onClick={() => handleDelete(item.id,item.firstName)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                        <button onClick={() => handleView(item.id)} className="btn btn-info" style={{ marginLeft: "10px" }}>View</button>
                                    </td>
                            </tr>)
                        }
                    </tbody>
                </table> 
            </div>     
        
        </div>
    );
};

export default ListEmployee;