import React, {useEffect, useState, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ViewEmployee = () => {

    const {id} = useParams()
   
    const [singleEmployee, setSingleEmployee] = useState([])

    let navigate = useNavigate()

    useEffect(() =>
    {
        const abortController = new AbortController();

            const fetchEmployee = () => {
                 fetch(process.env.REACT_APP_EMPLOYEE_URL + `/${id}`, {
                     method: "GET",
                     headers: { 'Content-Type': 'application/json' },
                 })
                     .then((res) =>
                     {
                         if (res.ok)
                         {
                             res.json()
                                 .then(data =>
                                 {
                                     setSingleEmployee(data)
                                 })
                         } else {
                            navigate(`/error`)
                            throw new Error("Something went wrong - Employee doesn't exist")      
                         }
                     })
                
                }

                fetchEmployee();

                return () =>abortController.abort();
    }, [])

    const handleUpdate = (id) =>
    {
        navigate(`/addupdate/${id}`)
    }  

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
                    toast.success("Employee Updated Successfully! Redirecting to main page", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() =>
                {
                    navigate('/employees')
                }, 3000);
            }
        } catch (err)
        {
            toast.error("Error - Employee failed to be deleted.");
        }
    }
  
    const hasData = singleEmployee.length


    const goDepartment = () =>
    {
        const idx = singleEmployee.department.id
        navigate(`/departments/${idx}/employees`)
    }

    const goBack = () => {
        navigate(-1)
    }
    

    return (
        <div>
            <br></br>
            <br></br>
            <div className='card col-md-6 offset-md-3'>
                <br></br>
                <h3 className='text-center'>Employee's Information</h3>
                <div className='card-body'>
                        <div className="row">
                        <label>First Name: {singleEmployee.firstName}</label>
                        </div>
                    <div className="row">
                        <label>Last Name: {singleEmployee.lastName}</label>
                    </div>
                    <div className="row">
                        <label>Email: {singleEmployee.email}</label>
                    </div>
                    <div className="row">
                        {hasData === undefined ? <label>Department: {singleEmployee.department.departmentName}</label> : <p>Loading..</p>}
                    </div>
                    <div className="row">
                        <label>Employee ID: {singleEmployee.id}</label>
                    </div>
                    <div className="row">
                        <label>Account Created On: {singleEmployee.createdDate}</label>
                    </div>
                    <br></br>
                    <button onClick={() => handleUpdate(singleEmployee.id)} className="btn btn-info">Update</button>
                    <button onClick={() => handleDelete(singleEmployee.id, singleEmployee.firstName)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                 </div>
                
            </div>
            <br/>
            <div className='row col-md-6 offset-md-3'>
            {hasData === undefined ?
                    <button className="btn btn-info" type="button" onClick={goDepartment} style={{ textAlign: "center" }}>Go to Employee's Department</button> : <p>Loading..</p>
            }
            </div>
            <br></br>
            <div className='col-md-6 offset-md-5'>
                {hasData === undefined ?
                    <button className="btn btn-danger" type="button" onClick={goBack} style={{ textAlign: "center" }}>Go Back</button> : <p>Loading..</p>
                }
            </div>
        </div>
    );
};

export default ViewEmployee;