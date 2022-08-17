import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

import axios from '../api/axios';
const LOGIN_URL = "/authenticate?email=customer1%40business.com&password=password123";

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // const from = location.state?.from.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    useEffect(() => {
        userRef.current.focus();
    }, [])
    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await axios.post(LOGIN_URL,
                // JSON.stringify({ email: user, password: pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            // navigate(from, { replace: true });
            navigate("/", { replace: true });
        } catch (err) { 
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }

    }    
    
    return (
        <section>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                <img src="react-login\src\logo.png" alt="Rocket Elevators Logo"></img>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h3 className="Auth-form-title">Sign In</h3>
                    <div className="Auth-form-content">
                        <div className="form-group mt-3">
                            <label htmlFor="user">Email address</label>
                            <input
                                type="email"
                                id="user"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-primary">
                                Sign in
                            </button>
                        </div>
                        {/* <p className="forgot-password text-right mt-2"> */}
                            {/* Forgot <a href="#">password?</a> */}
                        {/* </p> */}
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login