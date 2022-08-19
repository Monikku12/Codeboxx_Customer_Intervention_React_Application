import { useState, useEffect } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const Users = () => {
    const [setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/customers/current", {
                    signal: controller.signal,
                });
                const customerId = response.data.map((customer) => customer.id);
                isMounted && setUsers(customerId);
            } catch (err) {
                console.error(err);
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

// -------------TEST--------------
    // return (
    //     <article>
    //         <h2>Users List</h2>
    //         {users?.length
    //             ? (
    //                 <ul>
    //                     {users.map((user, i) => <li key={i}>{user?.id}</li>)}
    //                 </ul>
    //             ) : <p>No users to display</p>
    //         }
    //         <br/>
    //     </article>
    // );
};

export default Users;