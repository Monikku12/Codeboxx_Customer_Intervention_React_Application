import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

// import { useRef, useState, useEffect } from "react";
import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import useAuth from "../Hooks/useAuth";
import axiosPrivate from "../api/axios";
// import useAxiosPrivate from "../Hooks/useAxiosPrivate";
// import axios from "../api/axios";

// import customerData from "../FakeData/customerData";
import buildingData from "../FakeData/buildingData";
import batteryData from "../FakeData/batteryData";
import columnData from "../FakeData/columnData";
import elevatorData from "../FakeData/elevatorData";

const REQUEST_URL = "/interventions/new";

const InterventionRequest = () => {
    // const AUTH = useAxiosPrivate();
    // const navigate = useNavigate();
    // const userRef = useRef();
    const errRef = useRef();

    const [errMsg, setErrMsg] = useState("");
    const [setMsg] = useState("");

    const [buildingId, setBuilding] = React.useState([buildingData]);
    const [batteryId, setBattery] = React.useState([batteryData]);
    const [columnId, setColumn] = React.useState([columnData]);
    const [elevatorId, setElevator] = React.useState([elevatorData]);
    const [report, setReport] = React.useState();

    const handleBuildingChange = (event) => {
        setBuilding(event.target.value);
    };
    const handleBatteryChange = (event) => {
        setBattery(event.target.value);
    };
    const handleColumnChange = (event) => {
        setColumn(event.target.value);
    };
    const handleElevatorChange = (event) => {
        setElevator(event.target.value);
    };
    const handleReportChange = (event) => {
        setReport(event.target.value);
    };

    
    // useEffect(() => {
    //     userRef.current.focus();
    // }, []);

    //     useEffect(() => {
    //         setErrMsg("");
    //     }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post(REQUEST_URL, {
                // JSON.stringify({ email: user, password: pwd }),
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                // Authorization: AUTH,
                body: {
                    customerID: "customerId",
                    buildingID: { buildingId },
                    batteryID: { batteryId },
                    columnID: { columnId },
                    elevatorID: { elevatorId },
                    report: { setReport },
                },
            });
            const accessToken = response?.data?.accessToken;
            console.log(accessToken);
            //             setAuth({ user, accessToken });
            // setUser("");
            setMsg("Your request as been sent");
            //             setPwd("");
            //             navigate("/", { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 403) {
                setErrMsg("Oops! Something went wrong. Error 403");
            } else {
                setErrMsg("Request Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <section>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    {/* <img className="mainLogo" src={mainLogo} alt="Rocket Elevators Logo"></img> */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h3 className="Auth-form-title">Intervention Request</h3>
                    <div className="Auth-form-content">
                        <div className="form-group mt-3">
                            <label>Building</label>
                            <Dropdown options={[buildingData.id]} value={buildingId} onChange={handleBuildingChange} placeholder="Select Building" />
                        </div>
                        <div className="form-group mt-3">
                            <label>Battery</label>
                            <Dropdown options={[batteryData.id]} value={batteryId} onChange={handleBatteryChange} placeholder="Select Battery" />
                        </div>
                        <div className="form-group mt-3">
                            <label>Column</label>
                            <Dropdown options={[columnData.id]} value={columnId} onChange={handleColumnChange} placeholder="Select Column" />
                        </div>
                        <div className="form-group mt-3">
                            <label>Elevator</label>
                            <Dropdown options={[elevatorData.id]} value={elevatorId} onChange={handleElevatorChange} placeholder="Select Elevator" />
                        </div>
                        <div className="form-group mt-3">
                            <label>Report</label>
                            <input
                                type="text_area_tag"
                                id="report"
                                value={report}
                                required
                                className="form-control mt-1"
                                placeholder="Explain the problem here."
                                onChange={handleReportChange}
                            />
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default InterventionRequest;