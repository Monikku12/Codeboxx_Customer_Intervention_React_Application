import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
import Interventions from "./Interventions";

// const requestOptions = {
//     headers: {
//         Authorization: localStorage.getItem("bearerToken"),
//     },
// };

// const getInterventions = async (setInterventions) => {
//     try {
//         // console.log("requestOptions:", requestOptions);

//         const res = await axios.get("/interventions", requestOptions);
//         // console.log("[getInterventions] res is :", res);

//         setInterventions(res.data);
//     } catch (error) {
//         console.warn("[getInterventions] Error: ", error);
//     }
// };

const Home = () => {
    const navigate = useNavigate();

    // const [interventions, setInterventions] = useState([]);

    // useEffect(() => {
    //     console.log("useEffect!");
    //     getInterventions(setInterventions);
    // }, []);

    const interventionRequest = async () => {
        navigate("/InterventionRequest");
        console.log("Intervention Request!");
    };

    const logout = async () => {
        localStorage.clear();
        navigate("/");
        console.log("logout!");
        console.log(localStorage.getItem("bearerToken"));
    };

    // const InterventionRequest = async () => {
    //     navigate("/InterventionRequest", { replace: true });
    // };

    return (
        <section>
            <h1>Home Page</h1>
            <br />
            <p>The interventions will be displayed here.</p>
            <br />
            <Interventions />
            <br />

            <div className="d-grid gap-2 mt-3">
                <button onClick={interventionRequest} className="btn btn-primary">
                    New Intervention Request
                </button>
            </div>
            <br />
            <div className="d-grid gap-2 mt-3">
                <button onClick={logout} className="btn btn-primary">
                    Log out
                </button>
            </div>
        </section>
    );
};

export default Home;
