import { useMemo, useState, useEffect } from "react";
// import { useTable} from "react-table";
import axios from "axios";

const requestOptions = {
    headers: {
        Authorization: localStorage.getItem("bearerToken"),
    },
};

const getInterventions = async (setInterventions) => {
    try {
        // console.log("requestOptions:", requestOptions);

        const res = await axios.get("/customers/current", requestOptions);
        console.log("[getInterventions] res is :", res);

        setInterventions(res.data);
    } catch (error) {
        console.warn("[getInterventions] Error: ", error);
    }
};

function Interventions() {
    
    const [interventions, setInterventions] = useState([]);
    
    useEffect(() => {
        console.log("useEffect! Get data.");
        getInterventions(setInterventions);
    }, []);    

    // const columns = useMemo(
    //     () => [
    //         {
    //             Header: "Interventions",
    //             columns: [
    //                 {
    //                     Header: "ID",
    //                     accessor: "fact_interventions.id",
    //                     // accessor: "customer.interventions.id",
    //                 },
    //                 {
    //                     Header: "Status",
    //                     accessor: "fact_interventions.Status",
    //                     // accessor: "customer.interventions.status",
    //                 },
    //                 {
    //                     Header: "Result",
    //                     accessor: "fact_interventions.Result",
    //                     // accessor: "customer.interventions.result",
    //                 },
    //             ],
    //         },
    //         {
    //             Header: "Details",
    //             columns: [
    //                 {
    //                     Header: "Building",
    //                     accessor: "interventions.building.BuildingID",
    //                     // accessor: "interventions.building.address",
    //                 },
    //                 {
    //                     Header: "Battery",
    //                     accessor: "interventions.BatteryID",
    //                     // accessor: "interventions.battery.id",
    //                     // Cell: ({ cell: { value } }) => (value ? { value } : "-"),
    //                 },
    //                 {
    //                     Header: "Column",
    //                     accessor: "interventions.ColumnID",
    //                     // accessor: "interventions.column.id",
    //                     // Cell: ({ cell: { value } }) => (value ? { value } : "-"),
    //                 },
    //                 {
    //                     Header: "Elevator",
    //                     accessor: "interventions.ElevatorID",
    //                     // accessor: "interventions.elevator.id",
    //                     // Cell: ({ cell: { value } }) => (value ? { value } : "-"),
    //                 },
    //             ],
    //         },
    //     ],
    //     []
    // );
        
    // const tableInstance = useTable({ columns, interventions });

    // const {
    //     getTableProps, // table props from react-table
    //     getTableBodyProps, // table body props from react-table
    //     headerGroups, // headerGroups, if your table has groupings
    //     rows, // rows for the table based on the data passed
    //     prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    // } = tableInstance;

    // useEffect(() => {
    //     console.log(headerGroups);
    //     console.log(rows);
    // });

    
    // interventions();

    // return (
    //     <table {...getTableProps()}>
    //         <thead>
    //             {headerGroups.map((headerGroup) => (
    //                 <tr {...headerGroup.getHeaderGroupProps()}>
    //                     {headerGroup.headers.map((column) => (
    //                         <th {...column.getHeaderProps()}>{column.render("Header")}</th>
    //                     ))}
    //                 </tr>
    //             ))}
    //         </thead>
    //         <tbody {...getTableBodyProps()}>
    //             {rows.map((row, i) => {
    //                 prepareRow(row);
    //                 return (
    //                     <tr {...row.getRowProps()}>
    //                         {row.cells.map((cell) => {
    //                             return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
    //                         })}
    //                     </tr>
    //                 );
    //             })}
    //         </tbody>
    //     </table>
    // );
}

export default Interventions;