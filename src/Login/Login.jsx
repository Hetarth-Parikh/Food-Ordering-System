import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import login from './login.jpg';
import { UserLoggedin } from '../App';
import './Login.css'

const Login = () => {
    
    const history = useHistory();
    const [userDetails, setUserDetails] = useState({ email: "", password: "" });
    const { dispatch } = useContext(UserLoggedin);
    
    const setDetails = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserDetails({ ...userDetails, [name]: value });
    }
    const authenticateUser = async (e) => {
        e.preventDefault();
        const { email, password } = userDetails;
        if (!email || !password)
            return;
        
        document.getElementById("spin").classList.remove('spinner');
        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();

        if (res.status === 400) {
            toast.error(data.message, {
                position: "top-center",
            });
            document.getElementById("spin").classList.add('spinner');
        }
        else {
            toast.success(data.message, {
                position: "top-center",
            });
            dispatch({ type: 'LOGIN', value: true });
            localStorage.setItem("isLoggedin", true);
            setTimeout(() => {
                history.push('./');
            }, 3000);
        }
    }


    return (
        <>
            <div className="myContainer">
                <div className="login">
                    <div className="img">
                        <img src={login} alt="Login" />
                    </div>
                    <div className="loginForm">
                        <form method="POST">
                            <h1 className="display-5"><strong>Sign In</strong></h1>
                            <div className="mb-3 mt-4 combine_field">
                                <label htmlFor="email">
                                    <EmailIcon />
                                </label>
                                <input type="email" className="form-control" id="email" name="email" value={userDetails.email} onChange={setDetails} placeholder="Enter Your Email" />
                            </div>
                            <div className="mb-3 combine_field">
                                <label htmlFor="password">
                                    <LockOpenIcon />
                                </label>
                                <input type="password" className="form-control" id="password" name="password" value={userDetails.password} onChange={setDetails} placeholder="Enter Your Password" />
                            </div>
                            <div className="combine_field">
                                <button type="submit" className="btn btn-primary btn-lg mt-3 display-1" onClick={authenticateUser}>Log In </button>
                                <div className="spinner" id="spin">
                                    <CircularProgress size="25" />
                                </div>
                            </div>
                        </form>
                        <div className="display-7 mt-3">
                            <NavLink to='/signup'>
                                Create a new account
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login;