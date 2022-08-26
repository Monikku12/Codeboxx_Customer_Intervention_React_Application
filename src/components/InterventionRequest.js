import { useNavigate } from "react-router-dom";
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

        setBuildings(res.data);
    } catch (error) {
        console.warn("[getBuildingByCustomerID] Error: ", error);
    }
};

const getBatteriesByBuildingID = async (buildingID, setBatteries) => {
    try {
        const res = await axios.get(`/buildings/${buildingID}/batteries`, requestOptions);

        setBatteries(res.data);
    } catch (error) {
        console.warn("[getBatteriesByBuildingID] Error: ", error);
    }
};

const getColumnsByBatteryID = async (batteryID, setColumns) => {
    try {
        const res = await axios.get(`/batteries/${batteryID}/columns`, requestOptions);

        setColumns(res.data);
    } catch (error) {
        console.warn("[getColumnsByBatteryID] Error: ", error);
    }
};

const getElevatorsByColumnID = async (columnID, setElevators) => {
    // console.log("getElevatorsByColumnID columnID is:", columnID);
    try {
        const res = await axios.get(`/columns/${columnID}/elevators`, requestOptions);
        // console.log("getElevatorsByColumnID res is:", res);

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
    const [buildingID, setBuildingID] = useState(0);
    const [batteryID, setBatteryID] = useState(0);
    const [columnID, setColumnID] = useState(0);
    const [elevatorID, setlevatorID] = useState(0);

    const [buildings, setBuildings] = useState([]);
    const [batteries, setBatteries] = useState([]);
    const [columns, setColumns] = useState([]);
    const [elevators, setElevators] = useState([]);

    useEffect(() => {
        getBuildingByCustomerID(setBuildings);
    }, []);

    useEffect(() => {
        if (buildingID !== 0) {
            getBatteriesByBuildingID(buildingID, setBatteries);
        }
    }, [buildingID]);

    useEffect(() => {
        if (batteryID !== 0) {
            console.log("useEffect! BatteryID is:", batteryID);
            // getColumnsByBatteryID(batteryID, setColumns);
        }
    }, [batteryID]);

    // useEffect(() => {
    //     console.log("useEffect! Get Elevators");
    //     getElevatorsByColumnID(columnID, setElevators);
    // }, [columnID]);

    const handleBuildingChange = (e) => {
        setBuildingID(e.target.value);
    };

    const handleBatteryChange = (e) => {
        setBatteryID(e.target.value);
    };

    return (
        <section>
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
                            <select onChange={handleBuildingChange}>
                                <option value="Select a building"> -- Select a building -- </option>
                                {buildings.length !== 0 &&
                                    buildings.map((building) => (
                                        <option key={building.id} value={building.id}>
                                            {building.id}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label>Battery</label>
                            <select onChange={handleBatteryChange}>
                                <option value="Select a battery"> -- Select a battery -- </option>
                                {batteries.length !== 0 &&
                                    batteries.map((battery) => (
                                        <option key={battery.id} value={battery.id}>
                                            {battery.id}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label>Column</label>
                        </div>
                        <div className="form-group mt-3">
                            <label>Elevator</label>
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
