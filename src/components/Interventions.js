import { useState, useEffect } from "react";
import axios from "axios";

const GET_COSTUMER_URL = "/customers/current";

const requestOptions = {
    headers: {
        Authorization: localStorage.getItem("bearerToken"),
    },
};

const getCustomer = async (setCustomer) => {
    try {
        const res = await axios.get(GET_COSTUMER_URL, requestOptions);
        // console.log("[getCustomer] res is :", res);

        setCustomer(res.data);
    } catch (error) {
        console.warn("[getCustomer] Error: ", error);
    }
};

const Interventions = () => {
    useEffect(() => {
        // console.log("useEffect! Get data.");
        getCustomer(setCustomer);
    }, []);

    const [customer, setCustomer] = useState([]);
    // console.log("customer: ", customer);

    const renderTableHeader = () => {
        if (customer.length !== 0 && customer.interventions.length !== 0) {
            // console.log("renderTableHeader customer is:", customer);
            // console.log("renderTableHeader customer is:", customer[0]);
            let header = Object.keys(customer.interventions[0]);
            return header.map((key, index) => {
                // console.log("Header key: ", key);
                // const { id, status, result, building, battery, column, elevator } = key;
                return <th key={index}>{key.toUpperCase()}</th>;
            });
        } else {
            return <th></th>;
        }
    };

    const renderTableData = () => {
        return customer.interventions.map((customer, index) => {
            const { id, status, result, building, battery, column, elevator } = customer;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{status}</td>
                    <td>{result}</td>
                    <td>{building.id}</td>
                    <td>{battery.id}</td>
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
                        {customer.length !== 0 && customer.interventions.length !== 0 && renderTableHeader()}
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
