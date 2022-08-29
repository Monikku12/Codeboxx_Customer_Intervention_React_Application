import { useNavigate } from "react-router-dom";
import Interventions from "./Interventions";

const Home = () => {
    const navigate = useNavigate();

    const interventionRequest = async () => {
        navigate("/InterventionRequest");
    };

    const logout = async () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <section>
            <h1>Home Page</h1>
            <br />
            <p>Your interventions are listed in the table below.</p>
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
