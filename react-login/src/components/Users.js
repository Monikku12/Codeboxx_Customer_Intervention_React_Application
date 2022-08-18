import { useState, useEffect } from 'react';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';

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
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

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