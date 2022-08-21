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

    return (
        <section>
            <h1>Home Page</h1>
            <br />
            <p>The interventions will be displayed here.</p>
            <br />
            <Interventions />
            <br />
            {/* TODO LOGOUT BUTTON ⇊⇊⇊⇊⇊⇊ */}
            <div className="d-grid gap-2 mt-3">
                <button onClick={logout} className="btn btn-primary">
                    Log out
                </button>
            </div>
        </section>
    );
};

export default Home;
