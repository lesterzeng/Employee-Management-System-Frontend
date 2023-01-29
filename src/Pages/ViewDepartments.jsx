import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeDetailList from '../components/EmployeeDetailList';


const ViewDepartments= () =>
{

    const { id } = useParams()

    const [departmentDetails, setDepartmentDetails] = useState([])

    let navigate = useNavigate()

    useEffect(() =>
    {
        fetch(process.env.REACT_APP_DEPARTMENT_URL + `/${id}/employees`, {
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
                            setDepartmentDetails(data)
                        })
                } else
                {
                    navigate(`/error`)
                    throw new Error("Something went wrong - Employee doesn't exist")
                }
            })
    }, [])

    const hasData = departmentDetails.length

    const goBack = () =>
    {
        navigate(`/departments`)
    }

    const goListOfEmployees = () =>
    {
        navigate(`/`)
    }
    // console.log(departmentDetails)
    // console.log(hasData)
    // console.log(departmentDetails[0].department)

    return (
        <div>
            <br></br>
            <br></br>
            <div className='card col-md-6 offset-md-3'>
                <br></br>
                <div className='text-center'><h3>Department</h3></div>
                {
                hasData > 0 ? <div className='text-center'><h1>{departmentDetails[0].department.departmentName} </h1></div> : <div className='text-center'><h3>Loading..</h3></div>
                }
                <div className='text-center'>
                    {hasData > 0 ? <h4>ID: {departmentDetails[0].department.id}</h4> : <h4>Loading..</h4>}
                             
                </div>
            </div>
            <EmployeeDetailList/>
            <div className='row col-md-6 offset-md-3'>
                    <button className="btn btn-primary" type="button" onClick={goBack} style={{ textAlign: "center" }}>Go to List of Departments</button>
            </div>         
            <br></br>
            <div className='row col-md-6 offset-md-3'>
                <button className="btn btn-primary" type="button" onClick={goListOfEmployees} style={{ textAlign: "center" }}>Go to List of Employees</button>
            </div>
        </div>
    );
};

export default ViewDepartments;