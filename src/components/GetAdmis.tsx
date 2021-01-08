export function GetAdmis(studentNum: string) {
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