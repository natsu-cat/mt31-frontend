//import React from 'react';
import axios from 'axios';
const URL = "http://localhost:8000/api/"

export async function postUser( username: string, password: string ) {
    try {
        const response = await axios.post(URL + "authenticate/jwt/create",{"username":username,"password":password});
        const TOKENS = response.data;
        return getUser(TOKENS["access"]);
    } catch (error) {
        console.error(error);
        return -2;
    }
}

export async function getUser(token: any) {
    try {
        const response = await axios.get(URL + "login/", {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}` }
            });
        return response.data[0].admin_flag;
    } catch (error) {
        console.error(error);
        return -1;
    }
}