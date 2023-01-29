import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom'


const AddUpdateDepartment = () =>
{

    let navigate = useNavigate()

    const params = useParams();
    const { id } = params;

    const [employeeInput, setEmployeeInput] = useState({
        "departmentName": ""
    })


    const [departmentList, setDepartmentList] = useState([])



    const addUpdateDepartmentHandler = (e) =>
    {
        e.preventDefault();

        // If no params, should be ADD
        if (id == -1)
        {
            fetch(process.env.REACT_APP_DEPARTMENT_URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeInput),
            })
                .then((res) => 
                {
                    if (res.ok)
                    {
                        res.json()
                            .then(data =>
                            {

                                setDepartmentList([...departmentList, data])
                                setDepartmentList("")
                                toast.success("Department Added Successfully! Redirecting to department list.", {
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
                                    navigate('/departments')
                                }, 3000);
                            })

                    } else 
                    {
                        // navigate(`/error`)
                        toast.error("Department names must have at least 2 characters. Please try again.", {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        throw new Error("Invalid inputs for department creation.")
                    }
                })
        } else // else, should be UPDATE.
        {

            fetch(process.env.REACT_APP_DEPARTMENT_URL + `/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeInput),
            })
                .then((res) =>
                {
                    if (res.ok)
                    {
                        res.json()
                            .then(data =>
                            {
                                setDepartmentList([...departmentList, data])
                                setDepartmentList("")
                                toast.success("Department Updated Successfully! Redirecting to list of departments", {
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
                                    navigate('/departments')
                                }, 3000);
                            })
                    } else 
                    {

                        toast.error("Department names must have at least 2 characters. Please try again.", {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        throw new Error("Invalid inputs for department creation.")
                    }
                })
        }
    }


    const goBack = () =>
    {
        navigate(-1)
    }

    const getTitle = () =>
    {
        if (id == -1)
        {
            return <h3 className='text-center'>Add Department</h3>
        } else
        {
            return <h3 className='text-center'>Update Department Name</h3>
        }
    }

    const getButtonTitle = () =>
    {
        if (id == -1)
        {
            return <button className="btn btn-success" type="submit" onClick={addUpdateDepartmentHandler}>Add</button>
        } else
        {
            return <button className="btn btn-success" type="submit" onClick={addUpdateDepartmentHandler}>Update</button>
        }
    }

    return (
        <div>
            <br />
            <div className='"container'>
                <div className="row">
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <br />
                        {getTitle()}
                        <div className='card-body'>
                            <form >
                                <div className="form-group">
                                    <label>	&nbsp;Department Name</label>
                                    <input type="text" className='form-control' value={employeeInput.departmentName} placeholder="Enter Department Name" onChange={e => setEmployeeInput({ ...employeeInput, departmentName: e.target.value })} required></input>
                                </div>
                                <br />
                                {getButtonTitle()}
                                <button className="btn btn-danger" type="button" onClick={goBack} style={{ marginLeft: "10px" }}>Go Back</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUpdateDepartment;