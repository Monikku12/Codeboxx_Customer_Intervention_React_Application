import { useState, useEffect } from "react";
import axios from "axios";

const GET_COSTUMER_URL = "https://java-api.codeboxxtest.xyz/customers/current";

const requestHeader = {
    headers: {
        Authorization: localStorage.getItem("bearerToken"),
    },
};

const getCustomer = async (setCustomer) => {
    try {
        const res = await axios.get(GET_COSTUMER_URL, requestHeader);

        setCustomer(res.data);
    } catch (error) {
        console.warn("[getCustomer] Error: ", error);
    }
};

const Interventions = () => {
    const [customer, setCustomer] = useState([]);
    useEffect(() => {
        getCustomer(setCustomer);
    }, []);

    const renderTableData = () => {
        return customer.interventions.map((customer, index) => {
            const { id, status, result, building, battery, column, elevator } = customer;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{status}</td>
                    <td>{result}</td>
                    <td>{building != null ? building.id : "-"}</td>
                    <td>{battery != null ? battery.id : "-"}</td>
                    <td>{column != null ? column.id : "-"}</td>
                    <td>{elevator != null ? elevator.id : "-"}</td>
                </tr>
            );
        });
    };

    return (
        <div>
            <h1 id="title">Interventions</h1>
            <table id="customer">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Result</th>
                        <th>Building</th>
                        <th>Battery</th>
                        <th>Column</th>
                        <th>Elevator</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.length !== 0 && customer.interventions.length !== 0 && renderTableData()}
                </tbody>
            </table>
        </div>
    );
};

export default Interventions;