import axios from "axios";
// import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import useAuth from "../Hooks/useAuth";

const BASE_URL = "https://java-api.codeboxxtest.xyz";
// const AUTH = useAxiosPrivate();
// const { auth } = useAuth();


export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const axiosApiCall = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    Authorization: `Bearer ${useAuth?.accessToken}`,
    withCredentials: true,
});