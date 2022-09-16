import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import mainLogo from "../images/logo.png";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://java-api.codeboxxtest.xyz/authenticate?email=${email}&password=${password}`);
            const token = `Bearer ${res.data.access_token}`;

            localStorage.setItem("bearerToken", token);

            if (res.status === 200) {
                navigate("/Home", { replace: true });
            }
        } catch (error) {
            console.warn("[handleSubmit] Error: ", error);
        }
    };

    return (
        <section>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <img className="mainLogo" src={mainLogo} alt="Rocket Elevators Logo"></img>
                    <h3 className="Auth-form-title">Sign In</h3>
                    <h3 className="Auth-form-title">Test GitHub Action Deploy!</h3>
                    <div className="Auth-form-content">
                        <div className="form-group mt-3">
                            <label htmlFor="email">Email address</label>
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
                                autoComplete="off"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;