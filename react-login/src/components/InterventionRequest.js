import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { useRef, useState, useEffect } from "react";
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
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    // const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [setMsg] = useState("");

    // const [customer] = useState("");
    // const [building] = useState("");
    // const [battery] = useState("");
    // const [column] = useState("");
    // const [elevator] = useState("");

    // const customerList = [customerData];
    // const buildingList = [buildingData];
    // const batteryList = [batteryData];
    // const columnList = [columnData];
    // const elevatorList = [elevatorData];

    const [buildingId, setBuilding] = React.useState([buildingData]);
    const [batteryId, setBattery] = React.useState([batteryData]);
    const [columnId, setColumn] = React.useState([columnData]);
    const [elevatorId, setElevator] = React.useState([elevatorData]);

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

    
    useEffect(() => {
        userRef.current.focus();
    }, []);

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
                    buildingID: {buildingId},
                    batteryID: {batteryId},
                    columnID: {columnId},
                    elevatorID: {elevatorId},
                    report: "stringify",
                },
            });
            const accessToken = response?.data?.accessToken;
            console.log(accessToken);
            //             setAuth({ user, accessToken });
            setUser("");
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
                                id="user"
                                ref={userRef}
                                value={user}
                                required
                                className="form-control mt-1"
                                placeholder="Explain the problem here."
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


// ⇊⇊⇊⇊⇊⇊⇊⇊⇊ RUBY ⇊⇊⇊⇊⇊⇊⇊⇊⇊
// //  Interventions Form

//   <div class="row no-gutters wow slideInUp" data-wow-duration="1s">
//     <div class="col-md-12 home-form">
//      <form_tag(building_search_path, method: "get", class: "form-inline", remote: true) do />

//       <div id="author">
//         <form.hidden_field current_user.id, class: "formFieldReadOnly", readonly: true />
//       </div>

//       <div id="step_1">
//         form.label "Step 1 - Select Customer"
//         select_tag :customer_id, options_from_collection_for_select(Customer.all, "id", "id"), :required => true, prompt: "< Select customer>", class: "custom-select mb-0 mr-sm-0 mb-sm-0"
//       </div>


//       <div id="employee">
//         <form.label "Assigned Employee" />
//         <select_tag :employee_id, options_from_collection_for_select(Employee.all, "id", "id"), prompt: "None", class: "custom-select mb-0 mr-sm-0 mb-sm-0" />
//       </div>

//       <div id="intervention_started_at">
//         <hidden_field_tag :intervention_started_at />
//       </div>

//       <div id="intervention_ended_at">
//         <hidden_field_tag :intervention_ended_at />
//       </div>

//       <div id="result">
//         <hidden_field_tag :result />
//       </div>

//       <div id="report">
//         <form.label "Description" />
//         <text_area_tag :report />
//       </div>

//       <div id="status">
//         <hidden_field_tag :status />
//       </div>

//       <div class="actions">
//       <form.submit "Submit", :class => ["btn btn-danger", "fa fa-check"], :method => :post />
//     </div>
//    end
//    
// ⇈⇈⇈⇈⇈⇈⇈⇈⇈ RUBY ⇈⇈⇈⇈⇈⇈⇈⇈⇈


export default InterventionRequest;
