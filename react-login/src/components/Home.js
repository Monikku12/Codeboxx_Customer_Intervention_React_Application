import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Interventions from "./Interventions";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate("/");
    };

    const InterventionRequest = async () => {
        navigate("/InterventionRequest", { replace: true });
    };

    return (
        <section>
            <h1>Home Page</h1>
            <br />
            <p>The interventions will be displayed here.</p>
            <br />
            <Interventions />
            <br />
            <div className="d-grid gap-2 mt-3">
                <button link={InterventionRequest} className="btn btn-primary">
                    Intervention Request
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
