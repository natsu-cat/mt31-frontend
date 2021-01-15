import axios from 'axios';
const URL = "http://localhost:8000/api/"


/**
 * 初回ログイン時、リフレッシュトークンの有効期限が切れた際にユーザー名とパスワードからJWTトークンを取得する関数
 * @param {String} user - ユーザー名
 * @param {String} pwd - パスワード
 */
export function postUser(user: string, pwd: string) {
    return axios.post(URL + "authenticate/jwt/create", {
        "username": user,
        "password": pwd
    });
}

/**
 * ログインするユーザーが生徒か管理者か判別する関数
 */
export function getUser() {
    return axios.get(URL + "login/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        }
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
 * ユーザー情報からユーザーのIDを取得する関数
 * @param {number} secret_key - secretkey
 */
export function postKey(secret_key: number) {
    return axios.post(URL + "keyinquey/", {
        headers: {
            'key': secret_key
        }
    });
}

/**
 * パスワードを更新する関数
 * @param id ユーザーID
 * @param pwd 新しいパスワード
 */
export function putPwd(id: number, pwd: string) {
    return axios.put(URL + "changepw/" + id, {
        "password": pwd
    });
}

/**
 * 各CSVファイルをアップロードする関数
 * @param {FormData} data - csvファイル
 */
export function postGrade(data: FormData) {
    return axios.post(URL + "teacher/Grade/", data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        }
    });
}

export function postDepart(data: FormData) {
    return axios.post(URL + "teacher/Depart/", data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        }
    });
}

export function postCourse(data: FormData) {
    return axios.post(URL + "teacher/Course/", data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        }
    });
}

export function postStudent(data: FormData) {
    return axios.post(URL + "teacher/Student/", data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        }
    });
}

export function postSubject(data: FormData) {
    return axios.post(URL + "teacher/Subject/", data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${sessionStorage.getItem("access")}`
        }
    });
}