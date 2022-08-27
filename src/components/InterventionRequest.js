import { useNavigate } from "react-router-dom";
import mainLogo from "../images/logo.png";
import { useState, useEffect } from "react";
import axios from "axios";

const requestHeader = {
    headers: {
        Authorization: localStorage.getItem("bearerToken"),
    },
};

const getCustomerID = async (setCustomer) => {
    try {
        const res = await axios.get("/customers/current", requestHeader);

        setCustomer(res.data);
    } catch (error) {
        console.warn("[getCustomer] Error: ", error);
    }
};

const getBuildingByCustomerID = async (setBuildings) => {
    try {
        const res = await axios.get("/buildings", requestHeader);

        setBuildings(res.data);
    } catch (error) {
        console.warn("[getBuildingByCustomerID] Error: ", error);
    }
};

const getBatteriesByBuildingID = async (buildingID, setBatteries) => {
    try {
        const res = await axios.get(`/buildings/${buildingID}/batteries`, requestHeader);

        setBatteries(res.data);
    } catch (error) {
        console.warn("[getBatteriesByBuildingID] Error: ", error);
    }
};

const getColumnsByBatteryID = async (batteryID, setColumns) => {
    try {
        const res = await axios.get(`/batteries/${batteryID}/columns`, requestHeader);

        setColumns(res.data);
    } catch (error) {
        console.warn("[getColumnsByBatteryID] Error: ", error);
    }
};

const getElevatorsByColumnID = async (columnID, setElevators) => {
    try {
        const res = await axios.get(`/columns/${columnID}/elevators`, requestHeader);

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

    const [customer, setCustomer] = useState([]);

    const [buildingID, setBuildingID] = useState(0);
    const [batteryID, setBatteryID] = useState(0);
    const [columnID, setColumnID] = useState(0);
    const [elevatorID, setElevatorID] = useState(0);

    const [buildings, setBuildings] = useState([]);
    const [batteries, setBatteries] = useState([]);
    const [columns, setColumns] = useState([]);
    const [elevators, setElevators] = useState([]);
    const [report, setReport] = useState([]);

    let customerID = customer.id;

    useEffect(() => {
        getCustomerID(setCustomer);
    }, []);

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
            getColumnsByBatteryID(batteryID, setColumns);
        }
    }, [batteryID]);

    useEffect(() => {
        if (columnID !== 0) {
            getElevatorsByColumnID(columnID, setElevators);
        }
    }, [columnID]);
    
    const handleBuildingChange = (e) => {
        setBuildingID(e.target.value);
    };
    
    const handleBatteryChange = (e) => {
        setBatteryID(e.target.value);
    };
    
    const handleColumnChange = (e) => {
        setColumnID(e.target.value);
    };
    
    const handleElevatorChange = (e) => {
        setElevatorID(e.target.value);
        console.log("handleElevatorChange is : ", e.target.value);
    };

    const handleReportChange = (e) => {
        setReport(e.target.value);
        console.log("handleReportChange is : ", e.target.value);
    };

    const [message, setMessage] = useState(null);

    // {
    //     message && <label className="label">{message}</label>;
    // }

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "/interventions/new",
                {
                    customerID: customerID,
                    buildingID: buildingID,
                    batteryID: batteryID,
                    columnID: columnID,
                    elevatorID: elevatorID,
                    report: report,
                },
                requestHeader
            );
            console.log("[handleSubmit] res is :", res);
            if (res.status === 200) {
                setMessage("Your request was sent successfully.").then (navigate("/Home", { replace: true }));
            } else {
                setMessage("Oops! Something is not right.");
            }
        } catch (error) {
            console.warn("[getRequest] Error: ", error);
        }
    };

    return (
        <section>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <img className="mainLogo" src={mainLogo} alt="Rocket Elevators Logo"></img>
                    <h3 className="Auth-form-title">Intervention Request</h3>
                    <p>Fields with * are required.</p>
                    <div className="Auth-form-content">
                        { message && <label className="label">{message}</label> }
                        <div className="form-group mt-3">
                            <label>Building *</label>
                            <select required onChange={handleBuildingChange}>
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
                            <label>Battery *</label>
                            <select onChange={handleBatteryChange}>
                                <option required value="Select a battery"> -- Select a battery -- </option>
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
                            <select onChange={handleColumnChange}>
                                <option value="Select a column"> -- Select a column -- </option>
                                {columns.length !== 0 &&
                                    columns.map((column) => (
                                        <option key={column.id} value={column.id}>
                                            {column.id}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label>Elevator</label>
                            <select onChange={handleElevatorChange}>
                                <option value="Select an elevator"> -- Select an elevator -- </option>
                                {elevators.length !== 0 &&
                                    elevators.map((elevator) => (
                                        <option key={elevator.id} value={elevator.id}>
                                            {elevator.id}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label>Report *</label>
                            <input
                                type="text_area_tag"
                                id="report"
                                required
                                className="form-control mt-1"
                                placeholder="Explain the problem here."
                                onChange={handleReportChange}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button onClick={logout} className="btn btn-primary">
                                Log out
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default InterventionRequest;
