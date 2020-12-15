import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { Container } from 'react-bootstrap';
import { GetAdmis } from './GetAdmis';

interface Props {
    userDatas: [];
    username: string;
}

export default class IndivGrade extends React.Component<Props, any> {
    render() {
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
                        {showIndivGrade(this.props.userDatas, this.props.username)}
                    </Tab.Content>
                </Tab.Container>
            </Container>
        );
    }
}

function showIndivGrade(userDatas: any, username: string) {
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
    const ADMIS_YEARS = GetAdmis(username);
    let listAllTables: JSX.Element[] = new Array();
    let listFirstTables: JSX.Element[] = new Array();
    let listSecondTables: JSX.Element[] = new Array();
    let listThirdTables: JSX.Element[] = new Array();
    let listFourthTables: JSX.Element[] = new Array();

    for (let i in userDatas[0]) {
        const SUBJECT_YEARS = parseInt(userDatas[0][i].Dividend_period.slice(2, 4), 10);
        listAllTables[parseInt(i, 10)] = (
            <tr key={i}>
                <td>{userDatas[0][i].subject_name}</td>
                <td>{userDatas[0][i].Dividend_period}</td>
                <th>{userDatas[0][i].evaluation}</th>
                <th>{userDatas[0][i].Units}</th>
            </tr>
        );
        switch (SUBJECT_YEARS - ADMIS_YEARS) {
            case 0:
                listFirstTables[parseInt(i, 10)] = (
                    <tr key={i}>
                        <td>{userDatas[0][i].subject_name}</td>
                        <td>{userDatas[0][i].Dividend_period}</td>
                        <th>{userDatas[0][i].evaluation}</th>
                        <th>{userDatas[0][i].Units}</th>
                    </tr>
                );
                break;
            case 1:
            case -9:
                listSecondTables[parseInt(i, 10)] = (
                    <tr key={i}>
                        <td>{userDatas[0][i].subject_name}</td>
                        <td>{userDatas[0][i].Dividend_period}</td>
                        <th>{userDatas[0][i].evaluation}</th>
                        <th>{userDatas[0][i].Units}</th>
                    </tr>
                );
                break;
            case 2:
            case -8:
                listThirdTables[parseInt(i, 10)] = (
                    <tr key={i}>
                        <td>{userDatas[0][i].subject_name}</td>
                        <td>{userDatas[0][i].Dividend_period}</td>
                        <th>{userDatas[0][i].evaluation}</th>
                        <th>{userDatas[0][i].Units}</th>
                    </tr>
                );
                break;
            case 3:
            case -7:
                listFourthTables[parseInt(i, 10)] = (
                    <tr key={i}>
                        <td>{userDatas[0][i].subject_name}</td>
                        <td>{userDatas[0][i].Dividend_period}</td>
                        <th>{userDatas[0][i].evaluation}</th>
                        <th>{userDatas[0][i].Units}</th>
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
                        {listFirstTables}
                    </tbody>
                </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listSecondTables}
                    </tbody>
                </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listThirdTables}
                    </tbody>
                </Table>
            </Tab.Pane>
            <Tab.Pane eventKey="link-4">
                <Table striped bordered hover>
                    {gradeElements}
                    <tbody>
                        {listFourthTables}
                    </tbody>
                </Table>
            </Tab.Pane>
        </React.Fragment>
    )
}