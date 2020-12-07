import axios from 'axios';
const URL = "http://localhost:8000/api/"


/**
 * 初回ログイン時、リフレッシュトークンの有効期限が切れた際にユーザー名とパスワードからJWTトークンを取得する関数
 * @param {String} user - ユーザー名
 * @param {String} pwd - パスワード
 */
export function postUser(user: string, pwd: string) {
    axios.post(URL + "authenticate/jwt/create", {
        "username": user,
        "password": pwd
    }).then(res => {
        const TOKENS = res.data;
        sessionStorage.setItem("access", TOKENS["access"]);
        sessionStorage.setItem("refresh", TOKENS["refresh"]);
        getUser();
    }).catch(error => {
        console.error(error);
    });
}

/**
 * ログインするユーザーが生徒か管理者か判別する関数
 */
export function getUser() {
    axios.get(URL + "login/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        }
    }).then(res => {
        sessionStorage.setItem("flag", res.data[0].admin_flag);
        sessionStorage.setItem("isLoggedIn", "true");
        location.href = "/";                                        //認証通ったのでページ遷移する
    }).catch(error => {
        console.error(error);
        sessionStorage.setItem("flag", "-1");
    });
}

/**
 * 生徒個人の成績を取得する関数
 */
export function getIndivGrade() {
    return axios.get(URL + "student/indivgrade", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        }
    });
}


/**
 * 生徒全体の成績を取得する関数(管理者のみ)
 */
export function getAllGrade() {
    return axios.get(URL + "teacher/allgrade/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        },
    });
}

/**
 * ソート済みの生徒全体の成績を取得する関数(管理者のみ)
 */
export function getSourtGrade() {
    return axios.get(URL + "teacher/sourtgrade/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        },
    });
}

/**
 * 新しい管理者を登録する関数
 * @param {string} user - ユーザー名
 * @param {string} pwd - パスワード
 */
export function postAdmin(user: string, pwd: string) {
    return axios.post(URL + "create/", {
        "username": user,
        "password": pwd
    });
}

/**
 * ここから先未実装(バックエンドが完成したら実装予定)のためコメントアウト
 * @param data - csvファイル予定?
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