import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { Container } from 'react-bootstrap';

interface Props {
    isLoading: Boolean;
    userDatas: [];
    flag: number;
}

class Home extends React.Component<Props, any> {
    render() {
        const style: React.CSSProperties = { top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" };
        if (this.props.isLoading) {                         //Ajax認証が終わっていない間の処理
            return (
                <div style={style}>
                    <a>Loading...</a>
                </div>
            )
        } else if (this.props.flag == 0) {                  //生徒の場合
            return (
                <Container>
                    <Tab.Container defaultActiveKey="link-0">
                        <Nav variant="pills">
                            <Nav.Item>
                                <Nav.Link eventKey="link-0">総合</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">1年生</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2">2年生</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-3">3年生</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-4">4年生</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            {showIndivGrade(this.props.userDatas)}
                        </Tab.Content>
                    </Tab.Container>
                </Container>
            )
        } else if (this.props.flag == 1) {              //管理者の場合
            return (
                <a>管理者</a>
            )
        } else{                                         //例外処理
            return (
                <a>不正なログイン</a>
            )
        }
    }
}

export default Home;

function showIndivGrade(userDatas: any) {
    const gradeElements: JSX.Element = (
        <thead>
            <tr>
                <th>科目名</th>
                <th>単位</th>
                <th>評価</th>
                <th>学期</th>
            </tr>
        </thead>
    );

    const ADMIS_YEARS = parseInt(userDatas[0].student_number.slice(1, 2), 10);
    let listAllTables: JSX.Element[] = new Array();
    let listOneTables: JSX.Element[] = new Array();
    let listTwoTables: JSX.Element[] = new Array();
    let listThreeTables: JSX.Element[] = new Array();
    let listFourTables: JSX.Element[] = new Array();

    for (let i in userDatas) {
        const SUBJECT_YEARS = parseInt(userDatas[i].Units.slice(3, 4), 10);
        listAllTables[parseInt(i, 10)] = (
            <tr key={i}>
                <td>{userDatas[i].subject_name}</td>
                <td>{userDatas[i].Dividend_period}</td>
                <th>{userDatas[i].evaluation}</th>
                <th>{userDatas[i].Units}</th>
            </tr>
        );
        switch (SUBJECT_YEARS - ADMIS_YEARS) {
            case 0:
                listOneTables[parseInt(i, 10)] = (
                    <tr key={i}>
                        <td>{userDatas[i].subject_name}</td>
                        <td>{userDatas[i].Dividend_period}</td>
                        <th>{userDatas[i].evaluation}</th>
                        <th>{userDatas[i].Units}</th>
                    </tr>
                );
                break;
            case 1:
            case -9:
                listTwoTables[parseInt(i, 10)] = (
                    <tr key={i}>
                        <td>{userDatas[i].subject_name}</td>
                        <td>{userDatas[i].Dividend_period}</td>
                        <th>{userDatas[i].evaluation}</th>
                        <th>{userDatas[i].Units}</th>
                    </tr>
                );
                break;
            case 2:
            case -8:
                listThreeTables[parseInt(i, 10)] = (
                    <tr key={i}>
                        <td>{userDatas[i].subject_name}</td>
                        <td>{userDatas[i].Dividend_period}</td>
                        <th>{userDatas[i].evaluation}</th>
                        <th>{userDatas[i].Units}</th>
                    </tr>
                );
                break;
            case 3:
            case -7:
                listFourTables[parseInt(i, 10)] = (
                    <tr key={i}>
                        <td>{userDatas[i].subject_name}</td>
                        <td>{userDatas[i].Dividend_period}</td>
                        <th>{userDatas[i].evaluation}</th>
                        <th>{userDatas[i].Units}</th>
                    </tr>
                );
                break;
            default:
                break;
        }
    }
    return (
        <React.Fragment>
            <Tab.Pane eventKey="link-0">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listAllTables}
                    </tbody>
                </Table>
            </Tab.Pane>

            <Tab.Pane eventKey="link-1">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listOneTables}
                    </tbody>
                </Table>
            </Tab.Pane>

            <Tab.Pane eventKey="link-2">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listTwoTables}
                    </tbody>
                </Table>
            </Tab.Pane>

            <Tab.Pane eventKey="link-3">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listThreeTables}
                    </tbody>
                </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="link-4">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listFourTables}
                    </tbody>
                </Table>
            </Tab.Pane>
        </React.Fragment>
    )
}