import { useMemo, useState, useEffect } from "react";
import { useTable} from "react-table";
import axiosPrivate from "../api/axios";
// import axios from "axios";
// import InterventionsTable from "./InterventionsTable";
// import axiosApiCall from "../api/axios";
// import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import useAuth from "../Hooks/useAuth";

function Interventions() {
    // data state to store the Interventions API data. Its initial value is an empty array
    const INTERVENTION_URL = "/customers/current";
    const [data, setData] = useState([]);
    // const axiosPrivate = useAxiosPrivate();
    const auth = useAuth();
    // const { cookie } = useAxiosPrivate();
    const token = `Bearer ${useAuth?.accessToken}`;
    console.log("Token is:", token);
    
    const fetchData = async () => {
        try {
            // const response = axios.get(
                // "./interventionData"
            const response = await axiosPrivate.get(
                INTERVENTION_URL,
                {
                    Authorization: `Bearer ${auth?.accessToken}`,
                    //         // Authorization: useAxiosPrivate,
                    //     }
                    // Authorization: `Bearer ${useAuth?.accessToken}`,
                    // cookie?.header,

                    // {
                    //     headers: {
                    //         "Authorization": cookie,
                    //     },
                    // }

                    // {
                    //     headers: {
                    //         // "Content-Type": "application/json",
                    //         Authorization: `Bearer ${auth?.accesstoken}`,
                    //         // "Authorization": "Bearer " + auth?.accessToken,
                    //     },
                    //     // withCredentials: true,
                }
            );
            setData(response.data);
            const token = `Bearer ${useAuth?.accessToken}`;
            console.log("Token is:", token);
        } catch (err) {
            if (err.response) {
                // Not in the 200 response range
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log('Error: $(err.message)');
                console.log(err);
            }
        }
    }

    const columns = useMemo(
        () => [
            {
                Header: "Interventions",
                columns: [
                    {
                        Header: "ID",
                        accessor: "fact_interventions.id",
                        // accessor: "customer.interventions.id",
                    },
                    {
                        Header: "Status",
                        accessor: "fact_interventions.Status",
                        // accessor: "customer.interventions.status",
                    },
                    {
                        Header: "Result",
                        accessor: "fact_interventions.Result",
                        // accessor: "customer.interventions.result",
                    },
                ],
            },
            {
                Header: "Details",
                columns: [
                    {
                        Header: "Building",
                        accessor: "interventions.building.BuildingID",
                        // accessor: "interventions.building.address",
                    },
                    {
                        Header: "Battery",
                        accessor: "interventions.BatteryID",
                        // accessor: "interventions.battery.id",
                        Cell: ({ cell: { value } }) => (value ? { value } : "-"),
                    },
                    {
                        Header: "Column",
                        accessor: "interventions.ColumnID",
                        // accessor: "interventions.column.id",
                        Cell: ({ cell: { value } }) => (value ? { value } : "-"),
                    },
                    {
                        Header: "Elevator",
                        accessor: "interventions.ElevatorID",
                        // accessor: "interventions.elevator.id",
                        Cell: ({ cell: { value } }) => (value ? { value } : "-"),
                    },
                ],
            },
        ],
        []
    );
        
    const tableInstance = useTable({ columns, data });

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    } = tableInstance;

    useEffect(() => {
        console.log(headerGroups);
        console.log(rows);
    });

    
    fetchData();
   

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    // return (
    //     <div className="App">
    //         <InterventionsTable columns={columns} data={data} />
    //     </div>
    // );
}

export default Interventions;