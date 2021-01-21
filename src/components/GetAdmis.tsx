export function getAdmis(studentNum: string) {
    let admis_years = 0;
    let alpha = studentNum.slice(0, 1);
    admis_years += parseInt(studentNum.slice(1, 2), 10);
    switch (alpha) {
        case "A":
            break;
        case "B":
            admis_years += 10;
            break;
        case "C":
            admis_years += 20;
            break;
        case "D":
            admis_years += 30;
            break;
        case "E":
            admis_years += 40;
            break;
        case "F":
            admis_years += 50;
            break;
        case "G":
            admis_years += 60;
            break;
        case "H":
            admis_years += 70;
            break;
        case "I":
            admis_years += 80;
            break;
        case "J":
            admis_years += 90;
            break;
        case "K":
            admis_years += 100;
            break;
        case "L":
            admis_years += 110;
            break;
        case "M":
            admis_years += 120;
            break;
        case "N":
            admis_years += 130;
            break;
        case "O":
            admis_years += 140;
            break;
        case "P":
            admis_years += 150;
            break;
        case "Q":
            admis_years += 160;
            break;
        case "R":
            admis_years += 170;
            break;
        case "S":
            admis_years += 180;
            break;
        case "T":
            admis_years += 190;
            break;
        case "U":
            admis_years += 200;
            break;
        case "V":
            admis_years += 210;
            break;
        case "W":
            admis_years += 220;
            break;
        case "X":
            admis_years += 230;
            break;
        case "Y":
            admis_years += 240;
            break;
        case "Z":
            admis_years += 250;
            break;
    }
    return admis_years;
}

export function getUserArray(studentNum: string) {
    const splitOne = studentNum.slice(0, 1);
    const splitTwo = parseInt(studentNum.slice(1, 2), 10);
    const splitNum = parseInt(studentNum.slice(2), 10);
    let splitArray = new Array();
    switch (splitOne) {
        case "A":
            splitArray[0] = 0;
            break;
        case "B":
            splitArray[0] = 1;
            break;
        case "C":
            splitArray[0] = 2;
            break;
        case "D":
            splitArray[0] = 3;
            break;
        case "E":
            splitArray[0] = 4;
            break;
        case "F":
            splitArray[0] = 5;
            break;
        case "G":
            splitArray[0] = 6;
            break;
        case "H":
            splitArray[0] = 7;
            break;
        case "I":
            splitArray[0] = 8;
            break;
        case "J":
            splitArray[0] = 9;
            break;
        case "K":
            splitArray[0] = 10;
            break;
        case "L":
            splitArray[0] = 11;
            break;
        case "M":
            splitArray[0] = 12;
            break;
        case "N":
            splitArray[0] = 13;
            break;
        case "O":
            splitArray[0] = 14;
            break;
        case "P":
            splitArray[0] = 15;
            break;
        case "Q":
            splitArray[0] = 16;
            break;
        case "R":
            splitArray[0] = 17;
            break;
        case "S":
            splitArray[0] = 18;
            break;
        case "T":
            splitArray[0] = 19;
            break;
        case "U":
            splitArray[0] = 20;
            break;
        case "V":
            splitArray[0] = 21;
            break;
        case "W":
            splitArray[0] = 22;
            break;
        case "X":
            splitArray[0] = 23;
            break;
        case "Y":
            splitArray[0] = 24;
            break;
        case "Z":
            splitArray[0] = 25;
            break;
    }
    splitArray[1] = splitTwo;
    splitArray[2] = splitNum - 1;
    return splitArray;
}