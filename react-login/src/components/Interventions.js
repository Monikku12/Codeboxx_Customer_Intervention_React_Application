import React, { useMemo, useState, useEffect } from "react";
import ReactTable from "react-table";
import axios from "axios";
import InterventionsTable from "./InterventionsTable";

function Interventions() {
    // data state to store the Interventions API data. Its initial value is an empty array
    const columns = useMemo(
        () => [
            {
                Header: "Interventions",
                columns: [
                    {
                        Header: "ID",
                        accessor: "interventions.id",
                    },
                    {
                        Header: "Status",
                        accessor: "interventions.status",
                    },
                    {
                        Header: "Result",
                        accessor: "interventions.result",
                    },
                ],
            },
            {
                Header: "Details",
                columns: [
                    {
                        Header: "Building",
                        accessor: "interventions.building.address",
                    },
                    {
                        Header: "Battery",
                        accessor: "interventions.battery.id",
                    },
                    {
                        Header: "Column",
                        accessor: "interventions.column.id",
                    },
                    {
                        Header: "Elevator",
                        accessor: "interventions.elevator.id",
                    },
                ],
            },
        ],
        []
    );

    const [data, setData] = useState([]);

    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
        (async () => {
            const result = await axios.get("/customers/current");
            console.log(response.data);
            setData(result.data);
        })();
    }, []);

    return (
        <div className="App">
            <InterventionsTable columns={columns} data={data} />
        </div>
    );
}

export default Interventions;