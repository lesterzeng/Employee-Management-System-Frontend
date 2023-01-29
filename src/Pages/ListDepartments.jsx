import React,{useState, useEffect, useRef} from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const ListDepartments = () => {

    let navigate = useNavigate()

    const [departmentList, setDepartmentList] = useState([])


    useEffect(() =>
    {
        fetch(process.env.REACT_APP_DEPARTMENT_URL)

            .then(res => res.json())
            .then(data =>
            {
                setDepartmentList(data)
            })
    }, [departmentList])


    const handleUpdate = (id) => {
        navigate(`/departments/${id}`)
    }

    const handleDelete = (id, departmentName) =>
    {

        try
        {
            if (window.confirm(`Are you sure you want to delete department: ${departmentName}?`))
            {
                fetch(process.env.REACT_APP_DEPARTMENT_URL + `/${id}`, {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json' },

                })
                    .then((res) => res.json())
                    .then(data =>
                    {
                        setDepartmentList([...setDepartmentList, data])
                        setDepartmentList("")
                        console.log("DELETED!")
                    })
            }
        } catch (err)
        {
            toast.error("Error - Employee failed to be deleted.");
        }

    }

    const handleView = (id) =>
    {
        navigate(`/departments/${id}/employees`)
    }

    const handleAdd = () => 
    {
        navigate(`/departments/-1`)
    }

    const goBack = () =>
    {
        navigate(`/employees`)
    }


    return (
        <div>
            <br />
            <br />
            &nbsp;<h2 className='text-center'>List of Departments</h2>
            <br />
            <div className='row '>

                <table className="table table-sm table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Department Id</th>
                            <th>Department Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departmentList.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.departmentName}</td>
                        
                                    <td>
                                        <button onClick={() => handleUpdate(item.id)} className="btn btn-info">Update</button>
                                        <button onClick={() => handleDelete(item.id, item.departmentName)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                        <button onClick={() => handleView(item.id)} className="btn btn-info" style={{ marginLeft: "10px" }}>View</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className='row col-md-6 offset-md-3'>
                <button className="btn btn-success" onClick={handleAdd}>Add Department</button>
            </div>
            <br></br>
            <div className='row col-md-6 offset-md-3'>
                <button className="btn btn-primary" type="button" onClick={goBack} style={{ textAlign: "center" }}>Go to List of Employees</button>
            </div>
        </div>
    );
};

export default ListDepartments;