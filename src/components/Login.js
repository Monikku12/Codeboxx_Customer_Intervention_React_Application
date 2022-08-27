import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import mainLogo from "../images/logo.png";

const handleSubmit = async (email, password, navigate) => {
    try {
        // const res = await axios.post("/authenticate?email=customer1@business.com&password=password123");
        const res = await axios.post(`/authenticate?email=${email}&password=${password}`);
        // const res = await axios.post("/authenticate", { email: email, password: password });
        const token = `Bearer ${res.data.access_token}`;

        localStorage.setItem("bearerToken", token);
        console.log(res.data);
        if (res.status === 200) {
            navigate("/Home", { replace: true });
        }
    } catch (error) {
        console.warn("[handleSubmit] Error: ", error);
    }
};

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <section>
            <div className="Auth-form-container">
                <form className="Auth-form">
                <img className="mainLogo" src={mainLogo} alt="Rocket Elevators Logo"></img>
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="Auth-form-content">
                    <div className="form-group mt-3">
                        <label htmlFor="user">Email address</label>
                        <input
                            type="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button className="btn btn-primary" onClick={() => handleSubmit(email, password, navigate)}>
                            Sign in
                        </button>
                    </div>
                </div>
                </form>
            </div>
        </section>
    );
};

export default Login;