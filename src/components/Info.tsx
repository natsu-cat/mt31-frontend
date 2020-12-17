import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { GetAdmis } from './GetAdmis';

interface Props {
    userDatas: [];
    isLoading: Boolean;
    flag: number;
    username: string;
    studentNum: string;
}

class Info extends React.Component<Props, any> {
    render() {
        if (this.props.isLoading == true) {
            return renderElseCredit();
        }
        else if (this.props.flag == 0) {                                        //読み込み終了かつ生徒の場合のみ獲得単位表示
            return (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>学年</th>
                            <th>進級単位</th>
                            <th>獲得単位</th>
                            <th>評定平均</th>
                        </tr>
                    </thead>
                    {showStudentCredit(this.props.userDatas, this.props.username)}
                </Table>
            );
        } else if (this.props.flag == 1 && this.props.studentNum != null) {
            return (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>学年</th>
                            <th>進級単位</th>
                            <th>獲得単位</th>
                            <th>評定平均</th>
                        </tr>
                    </thead>
                    {showAdminCredit(this.props.userDatas, this.props.studentNum)}
                </Table>
            )
        } else {
            return renderElseCredit();
        }
    }
}

export default Info;

function showStudentCredit(userDatas: any, username: string) {
    const ADMIS_YEARS = GetAdmis(username);
    let allCredit: number = 0;
    let firstCredit: number = 0;
    let secondCredit: number = 0;
    let therdCredit: number = 0;
    let fourthCredit: number = 0;
    for (let i in userDatas[0]) {
        const SUBJECT_YEARS = parseInt(userDatas[0][i].Dividend_period.slice(2, 4), 10);
        allCredit += parseInt(userDatas[0][i].Units, 10);
        switch (SUBJECT_YEARS - ADMIS_YEARS) {
            case 0:
                firstCredit += parseInt(userDatas[0][i].Units, 10);
                break;
            case 1:
                secondCredit += parseInt(userDatas[0][i].Units, 10);
                break;
            case 2:
                therdCredit += parseInt(userDatas[0][i].Units, 10);
                break;
            case 3:
                fourthCredit += parseInt(userDatas[0][i].Units, 10);
        }
    }
    secondCredit += firstCredit;
    therdCredit += secondCredit;
    fourthCredit += therdCredit;
    return (
        <tbody>
            <tr>
                <td>1</td>
                <td>35</td>
                <td>{firstCredit}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>2</td>
                <td>70</td>
                <td>{secondCredit}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>3</td>
                <td>100</td>
                <td>{therdCredit}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>4</td>
                <td>120</td>
                <td>{fourthCredit}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>合計</td>
                <td>-</td>
                <td>{allCredit}</td>
                <td>{userDatas[1]}</td>
            </tr>
        </tbody>
    );
}

function showAdminCredit(userDatas: any, studentNum: any) {
    const ADMIS_YEARS = GetAdmis(userDatas[studentNum[0]][studentNum[1]][studentNum[2]][0].student_number);
    let allCredit: number = 0;
    let firstCredit: number = 0;
    let secondCredit: number = 0;
    let therdCredit: number = 0;
    let fourthCredit: number = 0;
    let ratingAvg: number = userDatas[studentNum[0]][studentNum[1]][studentNum[2]][2];
    for (let i in userDatas[studentNum[0]][studentNum[1]][studentNum[2]][1]) {
        const SUBJECT_YEARS = parseInt(userDatas[studentNum[0]][studentNum[1]][studentNum[2]][1][i].Dividend_period.slice(2, 4), 10);
        allCredit += parseInt(userDatas[studentNum[0]][studentNum[1]][studentNum[2]][1][i].Units, 10);
        switch (SUBJECT_YEARS - ADMIS_YEARS) {
            case 0:
                firstCredit += parseInt(userDatas[studentNum[0]][studentNum[1]][studentNum[2]][1][i].Units, 10);
                break;
            case 1:
                secondCredit += parseInt(userDatas[studentNum[0]][studentNum[1]][studentNum[2]][1][i].Units, 10);
                break;
            case 2:
                therdCredit += parseInt(userDatas[studentNum[0]][studentNum[1]][studentNum[2]][1][i].Units, 10);
                break;
            case 3:
                fourthCredit += parseInt(userDatas[studentNum[0]][studentNum[1]][studentNum[2]][1][i].Units, 10);
        }
    }
    return (
        <tbody>
            <tr>
                <td>1</td>
                <td>35</td>
                <td>{firstCredit}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>2</td>
                <td>70</td>
                <td>{secondCredit}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>3</td>
                <td>100</td>
                <td>{therdCredit}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>4</td>
                <td>120</td>
                <td>{fourthCredit}</td>
                <td>-</td>
            </tr>
            <tr>
                <td>合計</td>
                <td>-</td>
                <td>{allCredit}</td>
                <td>{ratingAvg}</td>
            </tr>
        </tbody>
    );
}

function renderElseCredit() {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>学年</th>
                    <th>進級単位</th>
                    <th>獲得単位</th>
                    <th>評定平均</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>35</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>70</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>100</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>120</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>合計</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </tbody>
        </Table>
    );
}