import React,{ useState, useEffect } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom'


const AddUpdateEmployee = () => {

    let navigate = useNavigate()

    const params = useParams();
    const { id } = params;

    const [employeeInput, setEmployeeInput] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"password",
        department:{
            id:""
        }
    })
    

    const [employeesList, setEmployeesList] = useState([])
    const [departmentList, setDepartmentList] = useState([])

    const token = localStorage.getItem("access_token");

    const addUpdateEmployeeHandler = (e) =>
    {
        e.preventDefault();
        
        // If no params, should be ADD
        if(id==-1){
            fetch(process.env.REACT_APP_AUTH_URL + `/register`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employeeInput),
            })
                .then((res) => 
                { 
                    if (res.ok)
                    { 
                        res.json()
                            .then(data =>
                            {   
                                console.log(data)
                                setEmployeesList([...employeesList, data])
                                setEmployeesList("")
                                toast.success("Employee Added Successfully! Redirecting to main page.", {
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
                            })
                       
                    } else 
                    {
                        toast.error("First and Last names must have at least 2 characters. Email must have @ Please try again.", {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        throw new Error("Invalid names and/or email inputs.")  
                    }
                })
        } else // else, should be UPDATE.
        {
            
            fetch(process.env.REACT_APP_EMPLOYEE_URL + `/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(employeeInput),
            })
                .then((res) => {
                    if(res.ok){
                        res.json()
                        .then(data =>
                {
                    setEmployeesList([...employeesList, data])
                    setEmployeesList("")
                    toast.success("Employee Updated Successfully! Redirecting..", {
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
                        navigate(`/view/${id}`)
                    }, 3000);
                })
                    } else 
                    {

                        toast.error("First and Last names must have at least 2 characters. Email must have @. Please try again.", {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        throw new Error("Invalid names and/or email inputs.")
                    }
                }) 
            }
    }

    
    const goBack = () => {
        navigate(-1)
    }

    const getTitle = () => {
        if(id == -1){
            return <h3 className='text-center'>Add Employee</h3>
        } else {
            return <h3 className='text-center'>Update Employee</h3>
        }
    }

    const getButtonTitle = () => {
        if (id == -1)
        {
            return <button className="btn btn-success" type="submit" onClick={addUpdateEmployeeHandler}>Add</button>
        } else
        {
            return <button className="btn btn-success" type="submit" onClick={addUpdateEmployeeHandler}>Update</button>
        }
    }

    useEffect(() =>
    {
        fetch(process.env.REACT_APP_DEPARTMENT_URL,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }, 
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
                setDepartmentList(data);
            })
            .catch(error =>
            {
                console.error(error);
            });
    }, [])

console.log(departmentList)

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
                            <div className = "form-group">
                                <label>	&nbsp;First Name:</label>
                                <input type="text" className='form-control' value={employeeInput.firstName} placeholder="Enter First Name" onChange={e=> setEmployeeInput({...employeeInput, firstName:e.target.value})} required></input>
                            </div>
                                <br />
                            <div className="form-group">
                                <label>	&nbsp;Last Name:</label>
                                <input type="text" className='form-control' value={employeeInput.lastName} placeholder="Enter Last Name" onChange={e => setEmployeeInput({ ...employeeInput, lastName: e.target.value })} required></input>
                            </div>
                                <br />
                            <div className="form-group">
                                <label>	&nbsp;Email</label>
                                <input type="email" className='form-control' value={employeeInput.email} placeholder="Enter Email" onChange={e => setEmployeeInput({ ...employeeInput, email: e.target.value })} required></input>
                            </div>
                                <br />
                                <div className="form-group">
                                    <label>Department</label>
                                    <select className='form-control' value={employeeInput.department.id} onChange={e => setEmployeeInput({
                                        ...employeeInput,
                                        department: {
                                            ...employeeInput.department,
                                            id: e.target.value
                                        }
                                    })} required>
                                        <option value="">Select Department</option>
                                        {
                                        departmentList.map((item => (
                                            <option key={item.id} value={item.id}>{item.departmentName}</option>
                                        )))
                                        }
                                    </select>
                                    

                                </div>
                                <br />
                                {getButtonTitle()}
                            <button className="btn btn-danger" type="button" onClick={goBack} style={{marginLeft:"10px"}}>Go Back</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default AddUpdateEmployee;