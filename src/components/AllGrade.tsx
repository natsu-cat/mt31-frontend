import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { Container } from 'react-bootstrap';

interface Props {
    userDatas: [];
}

export default class AllGrade extends React.Component<Props, any> {
    render() {
        return (
            <Container>
                <Tab.Container defaultActiveKey="link-0">
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="link-0">全学年</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">A0~A9</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">B0~B9</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3">C0~C9</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-4">D0~D9</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        {showAllGrade(this.props.userDatas)}
                    </Tab.Content>
                </Tab.Container>
            </Container>
        );
    }
}

function showAllGrade(userDatas: any) {
    const gradeElements: JSX.Element = (
        <thead>
            <tr>
                <th>学籍番号</th>
                <th>科目名</th>
                <th>単位</th>
                <th>評価</th>
                <th>学期</th>
            </tr>
        </thead>
    );
    let listAllTables: JSX.Element[] = new Array();
    let listATables: JSX.Element[] = new Array();
    let listBTables: JSX.Element[] = new Array();
    let listCTables: JSX.Element[] = new Array();
    let listDTables: JSX.Element[] = new Array();
    let cnt = 0, cntA = 0, cntB = 0, cntC = 0, cntD = 0;
    for (let idx1 in userDatas) {
        for (let idx2 in userDatas[idx1]) {
            for (let idx3 in userDatas[idx1][idx2]) {
                listAllTables[cnt] = (
                    <tr key={cnt}>
                        <td>{userDatas[idx1][idx2][idx3].student_number}</td>
                        <td>{userDatas[idx1][idx2][idx3].subject_name}</td>
                        <td>{userDatas[idx1][idx2][idx3].Units}</td>
                        <td>{userDatas[idx1][idx2][idx3].evaluation}</td>
                        <td>{userDatas[idx1][idx2][idx3].Dividend_period}</td>
                    </tr>
                );
                cnt++;
                switch (parseInt(idx1, 10)) {
                    case 0:
                        listATables[cntA] = (
                            <tr key={cntA}>
                                <td>{userDatas[idx1][idx2][idx3].student_number}</td>
                                <td>{userDatas[idx1][idx2][idx3].subject_name}</td>
                                <td>{userDatas[idx1][idx2][idx3].Units}</td>
                                <td>{userDatas[idx1][idx2][idx3].evaluation}</td>
                                <td>{userDatas[idx1][idx2][idx3].Dividend_period}</td>
                            </tr>
                        );
                        cntA++;
                        break;
                    case 1:
                        listBTables[cntB] = (
                            <tr key={cntB}>
                                <td>{userDatas[idx1][idx2][idx3].student_number}</td>
                                <td>{userDatas[idx1][idx2][idx3].subject_name}</td>
                                <td>{userDatas[idx1][idx2][idx3].Units}</td>
                                <td>{userDatas[idx1][idx2][idx3].evaluation}</td>
                                <td>{userDatas[idx1][idx2][idx3].Dividend_period}</td>
                            </tr>
                        );
                        cntB++;
                        break;
                    case 2:
                        listCTables[cntC] = (
                            <tr key={cntC}>
                                <td>{userDatas[idx1][idx2][idx3].student_number}</td>
                                <td>{userDatas[idx1][idx2][idx3].subject_name}</td>
                                <td>{userDatas[idx1][idx2][idx3].Units}</td>
                                <td>{userDatas[idx1][idx2][idx3].evaluation}</td>
                                <td>{userDatas[idx1][idx2][idx3].Dividend_period}</td>
                            </tr>
                        );
                        cntC++;
                        break;
                    case 3:
                        listDTables[cntD] = (
                            <tr key={cntD}>
                                <td>{userDatas[idx1][idx2][idx3].student_number}</td>
                                <td>{userDatas[idx1][idx2][idx3].subject_name}</td>
                                <td>{userDatas[idx1][idx2][idx3].Units}</td>
                                <td>{userDatas[idx1][idx2][idx3].evaluation}</td>
                                <td>{userDatas[idx1][idx2][idx3].Dividend_period}</td>
                            </tr>
                        );
                        cntD++;
                        break;
                    default:
                        break;
                }
            }
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
                        {listATables}
                    </tbody>
                </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listBTables}
                    </tbody>
                </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listCTables}
                    </tbody>
                </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="link-4">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listDTables}
                    </tbody>
                </Table>
            </Tab.Pane>
        </React.Fragment>
    )
}