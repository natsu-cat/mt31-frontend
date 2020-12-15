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
                <div className="info">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>学年</th>
                                <th>進級単位</th>
                                <th>獲得単位</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showStudentCredit(this.props.userDatas, this.props.username)}
                        </tbody>
                    </Table>
                </div>
            );
        } else if (this.props.flag == 1 && this.props.studentNum != null) {
            return (
                <div className="info">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>学年</th>
                                <th>進級単位</th>
                                <th>獲得単位</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showAdminCredit(this.props.userDatas, this.props.studentNum)}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return renderElseCredit();
        }
    }
}

export default Info;

function showStudentCredit(userDatas: any, username: string) {
    const ADMIS_YEARS = GetAdmis(username);
    let firstCredit: number = 0;
    let secondCredit: number = 0;
    let therdCredit: number = 0;
    let fourthCredit: number = 0;
    for (let i in userDatas) {
        const SUBJECT_YEARS = parseInt(userDatas[i].Dividend_period.slice(2, 4), 10);
        switch (SUBJECT_YEARS - ADMIS_YEARS) {
            case 0:
                firstCredit += parseInt(userDatas[i].Units, 10);
                break;
            case 1:
                secondCredit += parseInt(userDatas[i].Units, 10);
                break;
            case 2:
                therdCredit += parseInt(userDatas[i].Units, 10);
                break;
            case 3:
                fourthCredit += parseInt(userDatas[i].Units, 10);
        }
    }
    secondCredit += firstCredit;
    therdCredit += secondCredit;
    fourthCredit += therdCredit;
    return (
        <React.Fragment>
            <tr>
                <td>1</td>
                <td>35</td>
                <td>{firstCredit}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>70</td>
                <td>{secondCredit}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>100</td>
                <td>{therdCredit}</td>
            </tr>
            <tr>
                <td>4</td>
                <td>120</td>
                <td>{fourthCredit}</td>
            </tr>
        </React.Fragment>
    );
}

function showAdminCredit(userDatas: any, studentNum: any) {
    const ADMIS_YEARS = GetAdmis(userDatas[studentNum[0]][studentNum[1]][studentNum[2]][0].student_number);
    let firstCredit: number = 0;
    let secondCredit: number = 0;
    let therdCredit: number = 0;
    let fourthCredit: number = 0;
    for (let i in userDatas[studentNum[0]][studentNum[1]][studentNum[2]][1]) {
        const SUBJECT_YEARS = parseInt(userDatas[studentNum[0]][studentNum[1]][studentNum[2]][1][i].Dividend_period.slice(2, 4), 10);
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
        <React.Fragment>
            <tr>
                <td>1</td>
                <td>35</td>
                <td>{firstCredit}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>70</td>
                <td>{secondCredit}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>100</td>
                <td>{therdCredit}</td>
            </tr>
            <tr>
                <td>4</td>
                <td>120</td>
                <td>{fourthCredit}</td>
            </tr>
        </React.Fragment>
    );
}

function renderElseCredit() {
    return (
        <div className="info">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>学年</th>
                        <th>進級単位</th>
                        <th>獲得単位</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>35</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>70</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>100</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>120</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}