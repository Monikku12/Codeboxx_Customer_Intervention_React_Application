import React from "react";
// import { useState, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import mainLogo from "../images/logo.png";

// const getInterventions = async () => {
//     try {
//         console.log("localStorage bearerToken is :", localStorage.getItem("bearerToken"));
//         const token = localStorage.getItem("bearerToken");

//         const requestOptions = {
//             headers: {
//                 Authorization: token,
//             },
//         };

//         console.log("requestOptions:", requestOptions);

//         const res = await axios.get("/interventions", requestOptions);
//         console.log("[getInterventions] res is :", res);
//     } catch (error) {
//         console.warn("[getInterventions] Error: ", error);
//     }
// };

const handleSubmit = async (email, password, navigate) => {
    try {
        const res = await axios.post("/authenticate?email=customer1@business.com&password=password123");
        const token = `Bearer ${res.data.access_token}`;

        localStorage.setItem("bearerToken", token);

        // console.log("res is :", res);

        if (res.status === 200) {
            navigate("/Home", { replace: true });
        }
    } catch (error) {
        console.warn("[handleSubmit] Error: ", error);
    }
    console.log("Login!")
};

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [errMsg, setErrMsg] = useState("");

    // useEffect(() => {
    //     userRef.current.focus();
    // }, []);

    // useEffect(() => {
    //     setErrMsg("");
    // }, [user, pwd]);

    //  *** Login Form ***
    return (
        <section>
            <div className="Auth-form-container">
                <form className="Auth-form">
                <img className="mainLogo" src={mainLogo} alt="Rocket Elevators Logo"></img>
                {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p> */}
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
