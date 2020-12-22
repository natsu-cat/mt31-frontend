/**
 * 成績順にソートできるように成績別に優先度を返す関数
 * @param {String} grade 成績
 */
export function sortEvaluation(grade: string) {
    switch (grade) {
        case "秀":
            return 0;
        case "優":
            return 1;
        case "良":
            return 2;
        case "可":
            return 3;
        case "不可":
            return 4;
        default:
            return -1;
    }
}

/**
 * 配当期順にソートできるように配当期別に優先度を返す関数
 * @param {String} semester 配当期
 */
export function sortSemester(semester: string) {
    let result = 3 * parseInt(semester.slice(2, 4), 10);
    const range = semester.slice(4, 5);
    switch (range) {
        case "通":
            return result;
        case "前":
            return result + 1;
        case "後":
            return result + 2;
        default:
            return -1;
    }
}