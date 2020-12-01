import axios from 'axios';
const URL = "http://localhost:8000/api/"


/**
 * 初回ログイン時、リフレッシュトークンの有効期限が切れた際にユーザー名とパスワードからJWTトークンを取得する関数
 * @param {String} user - ユーザー名
 * @param {String} pwd - パスワード
 */
export function postUser( user: string, pwd: string ) {
    axios.post(URL + "authenticate/jwt/create",{
        "username":user,
        "password":pwd
    }).then(function(response) {
        const TOKENS = response.data;
        localStorage.setItem("access", TOKENS["access"]);
        localStorage.setItem("refresh", TOKENS["refresh"]);
        localStorage.setItem("isLoggedIn", "true");
        getUser();
    }).catch(function(error){
        console.error(error);
        localStorage.setItem("isLoggedIn", "false");
    });
}

/**
 * ログインするユーザーが生徒か管理者か判別するフラグを返す関数
 */
export function getUser() {
    axios.get(URL + "login/", {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem("access")}` }
    }).then(function(response){
        localStorage.setItem("flag",response.data[0].admin_flag);
    }).catch(function(error){
        console.error(error);
        localStorage.setItem("flag", "-1");
    });
}

/**
 * 生徒個人の成績を取得する関数
 */
export function getIndivGrade() {
    return new Promise((resolve, reject) => {
        axios.get(URL + "student/indivgrade", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem("access")}` }                
        }).then(function(response) {
            resolve(response.data);      
        })
        .catch(function(error){
            reject(error);
        });
    })
}


/**
 * 生徒全体の成績を取得する関数(管理者のみ)
 */
export function getAllGrade(){
    let result;
    axios.get(URL + "teacher/allgrade", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem("access")}` }  
    }).then(function(response) {
        result = response.data;
        console.log(result);
    }).catch(function(error) {
        console.error(error);
        return -1;
    });
    return result;
}

/**
 * ここから先未実装(バックエンドが完成したら実装予定)のためコメントアウト
 * @param data csvファイル予定?
 */
// export async function postGrade(data: any) {
//     try {
//         await axios.post(URL + "teacher/Grade", {
//             data
//         });
//     } catch(error) {
//         console.error(error);
//     }
// }

// export async function postDepart(data: any) {
//     try {
//         await axios.post(URL + "teacher/Depart", {
//             data
//         });
//     } catch(error) {
//         console.error(error);
//     }
// }

// export async function postCourse(data: any) {
//     try {
//         await axios.post(URL + "teacher/Course", {
//             data
//         });
//     } catch(error) {
//         console.error(error);
//     }
// }

// export async function postStudent(data: any) {
//     try {
//         await axios.post(URL + "teacher/Student", {
//             data
//         });
//     } catch(error) {
//         console.error(error);
//     }
// }

// export async function postSubject(data: any) {
//     try {
//         await axios.post(URL + "teacher/Subject", {
//             data
//         });
//     } catch(error) {
//         console.error(error);
//     }
// }