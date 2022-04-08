import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.53.32:3000/api/user",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Content-Type': 'application/json',
    },
});