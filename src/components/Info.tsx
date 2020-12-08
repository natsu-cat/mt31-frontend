import * as React from 'react';
import Table from 'react-bootstrap/Table';

interface Props {
    userDatas: [];
    isLoading: Boolean;
    flag: number;
    username: string;
}

class Info extends React.Component<Props, any> {
    render() {
        if (this.props.isLoading == false && this.props.flag == 0) {            //読み込み終了かつ生徒の場合のみ獲得単位表示
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
                            {showCredit(this.props.userDatas, this.props.username)}
                        </tbody>
                    </Table>
                </div>
            );
        } else {
            return renderElseCredit();
        }
    }
}

export default Info;

function showCredit(userDatas: any, username: string) {
    const ADMIS_YEARS = parseInt(username.slice(1, 2), 10);
    let firstCredit: number = 0;
    let secondCredit: number = 0;
    let therdCredit: number = 0;
    let fourthCredit: number = 0;
    for (let i in userDatas) {
        const SUBJECT_YEARS = parseInt(userDatas[i].Dividend_period.slice(3, 4), 10);
        switch (SUBJECT_YEARS - ADMIS_YEARS) {
            case 0:
                firstCredit += parseInt(userDatas[i].Units, 10);
                break;
            case 1:
            case -9:
                secondCredit += parseInt(userDatas[i].Units, 10);
                break;
            case 2:
            case -8:
                therdCredit += parseInt(userDatas[i].Units, 10);
                break;
            case 3:
            case -7:
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