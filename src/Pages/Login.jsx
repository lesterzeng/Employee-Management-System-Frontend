import React, { useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Login = () =>
{

    const [employeeInput, setEmployeeInput] = useState({
        email: "",
        password: ""
    })

    let navigate = useNavigate()

    const handleSubmit = () =>
    {
        try {
            fetch(process.env.REACT_APP_AUTH_URL +`/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: employeeInput.email,
                    password: employeeInput.password
                }),
            })
                .then((res) => 
                {
                    if (res.ok)
                    {
                        res.json()
                            .then(data =>
                            {
                                const token = data.accessToken
                                localStorage.setItem("access_token", token);
                                toast.success("Login Successfully! Redirecting to Dashboard.", {
                                    position: "bottom-center",
                                    autoClose: 1000,
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
                                }, 1000);
                            })
                    } else
                    {
                        toast.error("Invalid email and/or password. Please try again", {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        throw new Error("Invalid email and/or password.")
                    }
                })
        } catch (error) {
            toast.error("Invalid email and/or password. Please try again", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            throw new Error("Invalid email and/or password.")
        }
          
    }



    return (
        <div>
            <br></br>
            <br></br>
            <h4>Employee Management System</h4>
            <br></br>
            <h1>Welcome Administrator</h1>
            <br></br>
            <h5>Sign into your account</h5>
            <br></br>
            <form>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" >Email address</label>
                    <input type="email"  className="form-control" onChange={e => setEmployeeInput({ ...employeeInput, email: e.target.value })} />

                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" >Password</label>
                    <input type="password"  className="form-control" onChange={e => setEmployeeInput({ ...employeeInput, password: e.target.value })} />

                </div>

                {/* <!-- Submit button --> */}
                <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign in</button>
            </form>
        </div>
    );
};

export default Login;