import { useState, useEffect } from "react";
import axios from "axios";

const requestOptions = {
    headers: {
        Authorization: localStorage.getItem("bearerToken"),
    },
};

const getInterventions = async (setInterventions) => {
    try {

        const res = await axios.get("/customers/current", requestOptions);
        console.log("[getInterventions] res is :", res);

        setInterventions(res.data);
    } catch (error) {
        console.warn("[getInterventions] Error: ", error);
    }
};

const Interventions = () => {
    useEffect(() => {
        console.log("useEffect! Get data.");
        getInterventions(setInterventions);
    }, []);

    const [interventions, setInterventions] = useState([]);

    // const interventionsData = interventions.interventions;
    console.log("interventions: ", interventions);
    // console.log("interventionsData ", interventionsData);    
    
    // const renderTableHeader = () => {
    //     let header = Object.keys(interventions[0]);
    //     return header.map((key, index) => {
    //         return <th key={index}>{key.toUpperCase()}</th>;
    //     });
    // };

    const renderTableHeader = () => {
        if (interventions.length !== 0 && interventions.interventions.length !== 0) {
            let header = Object.keys(interventions[0]);
            return header.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>;
            });
        } else {
            return <th></th>;
        }
    };

    const renderTableData = () => {
        return interventions.map((interventions, index) => {
            const { id, status, result, building, battery, column, elevator, } = interventions;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{status}</td>
                    <td>{result}</td>
                    <td>{building.id}</td>
                    <td>{battery.id}</td>
                    <td>{column.id}</td>
                    <td>{elevator.id}</td>
                </tr>
            );
        });
    };

    return (
        <div>
            <h1 id="title">Interventions</h1>
            <table id="interventions">
                <thead>
                    <tr>{interventions.length !== 0 && interventions.interventions.length !== 0 && renderTableHeader()}</tr>
                </thead>
                <tbody>
                    <tr>{interventions.length !== 0 && interventions.interventions.length !== 0 && renderTableData()}</tr>
                </tbody>
            </table>
        </div>
    );
};

export default Interventions;