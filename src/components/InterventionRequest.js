import { useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import mainLogo from "../images/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";


const requestOptions = {
    headers: {
        Authorization: localStorage.getItem("bearerToken"),
    },
};

const getBuildingByCustomerID = async (setBuildings) => {
    try {
        const res = await axios.get("/buildings", requestOptions);
        // console.log("[getBuildingByCustomerID] res is :", res);
        
        setBuildings(res.data);
    } catch (error) {
        console.warn("[getBuildingByCustomerID] Error: ", error);
    }
};

const getBatteriesByBuildingID = async (buildingID, setBatteries) => {
    // console.log("getBatteriesByBuildingID buildingID is:", buildingID);
    try {
        const res = await axios.get(`/buildings/${buildingID}/batteries`, requestOptions);
        // console.log("getBatteriesByBuildingID res is:", res);
        
        setBatteries(res.data);
    } catch (error) {
        console.warn("[getBatteriesByBuildingID] Error: ", error);
    }
};

const getColumnsByBatteryID = async (batteryID, setColumns) => {
    // console.log("getColumnsByBatteryID batteryID is:", batteryID);
    try {
        const res = await axios.get(`/batteries/${batteryID}/columns`, requestOptions);
        // console.log("getColumnsByBatteryID res is:", res);
        
        setColumns(res.data);
    } catch (error) {
        console.warn("[getColumnsByBatteryID] Error: ", error);
    }
};

const getElevatorsByColumnID = async (columnID, setElevators) => {
    console.log("getElevatorsByColumnID columnID is:", columnID);
    try {
        const res = await axios.get(`/columns/${columnID}/elevators`, requestOptions);
        console.log("getElevatorsByColumnID res is:", res);
        
        setElevators(res.data);
    } catch (error) {
        console.warn("[getElevatorsByColumnID] Error: ", error);
    }
};

const InterventionRequest = () => {
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.clear();
        navigate("/");
        console.log("logout!");
        console.log(localStorage.getItem("bearerToken"));
    };

    const [buildings, setBuildings] = useState([]);
    const [batteries, setBatteries] = useState([]);
    const [columns, setColumns] = useState([]);
    const [elevators, setElevators] = useState([]);
    
    // const buildingID = buildings.id;
    const buildingID = 1;
    // console.log("buildingID is : ", buildingID);
    
    // const batteryID = batteries.id;
    const batteryID = 1;
    // console.log("batteryID is : ", batteryID);

    // const columnID = columns.id;
    const columnID = 1;
    // console.log("columnID is : ", columnID);

    // const elevatorID = elevators.id;
    const elevatorID = 1;
    console.log("elevatorID is : ", elevatorID);
    
    // console.log("buildings: ", buildings);
    // console.log("batteries: ", batteries);
    // console.log("columns: ", columns);
    console.log("elevators: ", elevators);
    
    useEffect(() => {
        console.log("useEffect! Get Buildings");
        getBuildingByCustomerID(setBuildings);
    }, []);

    useEffect(() => {
        console.log("useEffect! Get Batteries");
        getBatteriesByBuildingID(buildingID, setBatteries);
    }, [buildingID]);
    
    useEffect(() => {
        console.log("useEffect! Get Columns");
        getColumnsByBatteryID(batteryID, setColumns);
    }, [batteryID]);

    useEffect(() => {
        console.log("useEffect! Get Elevators");
        getElevatorsByColumnID(columnID, setElevators);
    }, [columnID]);
    
    // const postRequest = async (setRequest) => {
        //     try {
            //         const res = await axios.post(POST_REQUEST_URL, requestOptions);
    //         console.log("[getRequest] res is :", res);
    
    //         setRequest(res.data);
    //     } catch (error) {
    //         console.warn("[getRequest] Error: ", error);
    //     }
    // };
    
    // };
    
    return (
        <section>
            <p>Form comes here!</p>
            <div className="Auth-form-container">
                {/* <form className="Auth-form" onSubmit={handleSubmit}> */}
                <form className="Auth-form">
                    <img className="mainLogo" src={mainLogo} alt="Rocket Elevators Logo"></img>
                    {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p> */}
                    <h3 className="Auth-form-title">Intervention Request</h3>
                    <div className="Auth-form-content">
                        <div className="form-group mt-3">
                            <label>Building</label>
                            {/* <Dropdown options={[buildings.id]} value={buildingID} onChange={handleBuildingChange} placeholder="Select Building" /> */}
                            {/* <Dropdown options={[buildings.id]} value={buildingID} placeholder="Select Building" /> */}
                        </div>
                        <div className="form-group mt-3">
                            <label>Battery</label>
                            {/* <Dropdown options={[batteryData.id]} value={batteryId} onChange={handleBatteryChange} placeholder="Select Battery" /> */}
                        </div>
                        <div className="form-group mt-3">
                            <label>Column</label>
                            {/* <Dropdown options={[columnData.id]} value={columnId} onChange={handleColumnChange} placeholder="Select Column" /> */}
                        </div>
                        <div className="form-group mt-3">
                            <label>Elevator</label>
                            {/* <Dropdown options={[elevatorData.id]} value={elevatorId} onChange={handleElevatorChange} placeholder="Select Elevator" /> */}
                        </div>
                        <div className="form-group mt-3">
                            <label>Report</label>
                            {/* <input
                                type="text_area_tag"
                                id="report"
                                required
                                className="form-control mt-1"
                                placeholder="Explain the problem here."
                                onChange={handleReportChange}
                            /> */}
                        </div>

                        {/* <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-primary">Submit</button>
                        </div> */}
                    </div>
                </form>
            </div>
            <div className="d-grid gap-2 mt-3">
                <button onClick={logout} className="btn btn-primary">
                    Log out
                </button>
            </div>
        </section>
    );
};

export default InterventionRequest;
