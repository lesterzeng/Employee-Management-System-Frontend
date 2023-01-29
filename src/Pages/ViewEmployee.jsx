import React, {useEffect, useState, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const ViewEmployee = () => {

    const {id} = useParams()
   
    const [singleEmployee, setSingleEmployee] = useState([])
    

    const dataFetchedRef = useRef(false);

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

// console.log(singleEmployee)
// console.log(singleEmployee.length)
// console.log(singleEmployee.department)
// console.log(singleEmployee.department.id)

  
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