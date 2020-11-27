//import React from 'react';
import axios from 'axios';
const URL = "http://localhost:8000/api/"


/**
 * 初回ログイン時、リフレッシュトークンの有効期限が切れた際にユーザー名とパスワードからJWTトークンを取得する関数
 * @param {String} user - ユーザー名
 * @param {String} pwd - パスワード
 */
export async function postUser( user: string, pwd: string ) {
    try {
        const response = await axios.post(URL + "authenticate/jwt/create",{
            "username":user,
            "password":pwd
        });
        const TOKENS = response.data;
        console.log(typeof(TOKENS["access"]));
        localStorage.setItem("access", TOKENS["access"]);
        localStorage.setItem("refresh", TOKENS["refresh"]);
    } catch (error) {
        console.error(error);
    }
}

//ログインするユーザーが生徒か管理者か判別するフラグを返す関数
export async function getUser() {
    try {
        const response = await axios.get(URL + "login/", {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem("access")}` }
            });
        return response.data[0].admin_flag;
    } catch (error) {
        console.error(error);
        return -1;
    }
}