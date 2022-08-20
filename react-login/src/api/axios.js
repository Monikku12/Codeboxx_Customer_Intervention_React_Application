import axios from "axios";
// import useAxiosPrivate from "../Hooks/useAxiosPrivate,js";

const BASE_URL = "https://java-api.codeboxxtest.xyz";
// const AUTH = useAxiosPrivate();


export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// export const axiosApiCall = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": useAxiosPrivate,
//     },
//     withCredentials: true,
// });