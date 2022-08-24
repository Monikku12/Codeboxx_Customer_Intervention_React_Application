import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import InterventionRequest from "./components/InterventionRequest";
// import Interventions from "./components/Interventions";

function App() {
    return (
        <Routes>
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="/InterventionRequest" element={<InterventionRequest />} />
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/test" element={<Home />} />

            {/* <Route path="/" element={<Home />} /> */}
        </Routes>
    );
}

export default App;