import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import Interventions from "./Interventions";

const requestOptions = {
    headers: {
        Authorization: localStorage.getItem("bearerToken"),
    },
};

const getInterventions = async (setInterventions) => {
    try {
        console.log("requestOptions:", requestOptions);

        const res = await axios.get("/interventions", requestOptions);
        console.log("[getInterventions] res is :", res);

        setInterventions(res.data);
    } catch (error) {
        console.warn("[getInterventions] Error: ", error);
    }
};

const Home = () => {#
    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [interventions, setInterventions] = useState([]);

    useEffect(() => {
        console.log("useEffect!");
        getInterventions(setInterventions);
    }, []);

    // const logout = async () => {
    //     setAuth({});
    //     navigate("/");
    // };

    // const InterventionRequest = async () => {
    //     navigate("/InterventionRequest", { replace: true });
    // };

    return (
        <section>
            <h1>Home Page</h1>
            <br />
            <p>The interventions will be displayed here.</p>
            <br />
            {/* <Interventions /> */}
            <br />
            {/* {interventions.length != 0 && } */}

            {/* <div className="d-grid gap-2 mt-3">
                <button ref={InterventionRequest} className="btn btn-primary">
                    Intervention Request
                </button>
            </div>
            <br />
            <div className="d-grid gap-2 mt-3">
                <button onClick={logout} className="btn btn-primary">
                    Log out
                </button>
            </div> */}
        </section>
    );
};

export default Home;
