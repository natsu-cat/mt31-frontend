import * as React from 'react';
// import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { GetAdmis } from './GetAdmis';

interface Props {
    userDatas: [];
    username: string;
}

export default class IndivGrade extends React.Component<Props, any> {
    render() {
        hoge(this.props.userDatas, this.props.username);
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
                        {/* {showIndivGrade(this.props.userDatas, this.props.username)} */}
                    </Tab.Content>
                </Tab.Container>
                {hoge(this.props.userDatas, this.props.username)}
            </Container>
        );
    }
}

function hoge(userDatas: any, username: string) {
    const ADMIS_YEARS = GetAdmis(username);
    const data = [];
    for (let i in userDatas[0]) {
        data.push(userDatas[0][i]);
    }
    const columns = [
        { dataField: "subject_name", text: "科目名", sort: true, editable: false },
        { dataField: "lecture_name", text: "講師", sort: true, editable: false },
        { dataField: "Units", text: "単位", sort: true, editable: false },
        { dataField: "evaluation", text: "評価", sort: true, editable: false },
        { dataField: "Dividend_period", text: "年度", sort: true, editable: false },
    ];
    const defaultSorted: any = [{
        dataField: "Dividend_period",
        order: "asc"
    }];
    console.log(data);
    console.log(ADMIS_YEARS);
    return (
        <BootstrapTable
            data={data}
            columns={columns}
            keyField={"subject_name lecture_name"}
            striped
            hover
            bootstrap4
            bordered
            defaultSorted={defaultSorted}
        />
    )
}

// function showIndivGrade(userDatas: any, username: string) {
//     const gradeElements: JSX.Element = (
//         <thead>
//             <tr>
//                 <th>科目名</th>
//                 <th>講師</th>
//                 <th>単位</th>
//                 <th>評価</th>
//                 <th>学期</th>
//             </tr>
//         </thead>
//     );
//     const ADMIS_YEARS = GetAdmis(username);
//     let listAllTables: JSX.Element[] = new Array();
//     let listFirstTables: JSX.Element[] = new Array();
//     let listSecondTables: JSX.Element[] = new Array();
//     let listThirdTables: JSX.Element[] = new Array();
//     let listFourthTables: JSX.Element[] = new Array();

//     for (let i in userDatas[0]) {
//         const SUBJECT_YEARS = parseInt(userDatas[0][i].Dividend_period.slice(2, 4), 10);
//         listAllTables[parseInt(i, 10)] = (
//             <tr key={i}>
//                 <td>{userDatas[0][i].subject_name}</td>
//                 <td>{userDatas[0][i].lecture_name}</td>
//                 <td>{userDatas[0][i].Units}</td>
//                 <th>{userDatas[0][i].evaluation}</th>
//                 <th>{userDatas[0][i].Dividend_period}</th>
//             </tr>
//         );
//         switch (SUBJECT_YEARS - ADMIS_YEARS) {
//             case 0:
//                 listFirstTables[parseInt(i, 10)] = (
//                     <tr key={i}>
//                         <td>{userDatas[0][i].subject_name}</td>
//                         <td>{userDatas[0][i].lecture_name}</td>
//                         <td>{userDatas[0][i].Units}</td>
//                         <th>{userDatas[0][i].evaluation}</th>
//                         <th>{userDatas[0][i].Dividend_period}</th>
//                     </tr>
//                 );
//                 break;
//             case 1:
//                 listSecondTables[parseInt(i, 10)] = (
//                     <tr key={i}>
//                         <td>{userDatas[0][i].subject_name}</td>
//                         <td>{userDatas[0][i].lecture_name}</td>
//                         <td>{userDatas[0][i].Units}</td>
//                         <th>{userDatas[0][i].evaluation}</th>
//                         <th>{userDatas[0][i].Dividend_period}</th>
//                     </tr>
//                 );
//                 break;
//             case 2:
//                 listThirdTables[parseInt(i, 10)] = (
//                     <tr key={i}>
//                         <td>{userDatas[0][i].subject_name}</td>
//                         <td>{userDatas[0][i].lecture_name}</td>
//                         <td>{userDatas[0][i].Units}</td>
//                         <th>{userDatas[0][i].evaluation}</th>
//                         <th>{userDatas[0][i].Dividend_period}</th>
//                     </tr>
//                 );
//                 break;
//             case 3:
//                 listFourthTables[parseInt(i, 10)] = (
//                     <tr key={i}>
//                         <td>{userDatas[0][i].subject_name}</td>
//                         <td>{userDatas[0][i].lecture_name}</td>
//                         <td>{userDatas[0][i].Units}</td>
//                         <th>{userDatas[0][i].evaluation}</th>
//                         <th>{userDatas[0][i].Dividend_period}</th>
//                     </tr>
//                 );
//                 break;
//         }
//     }
//     return (
//         <React.Fragment>
//             <Tab.Pane eventKey="link-0">
//                 <Table striped bordered hover>
//                     {gradeElements}
//                     <tbody>
//                         {listAllTables}
//                     </tbody>
//                 </Table>
//             </Tab.Pane>
//             <Tab.Pane eventKey="link-1">
//                 <Table striped bordered hover>
//                     {gradeElements}
//                     <tbody>
//                         {listFirstTables}
//                     </tbody>
//                 </Table>
//             </Tab.Pane>
//             <Tab.Pane eventKey="link-2">
//                 <Table striped bordered hover>
//                     {gradeElements}
//                     <tbody>
//                         {listSecondTables}
//                     </tbody>
//                 </Table>
//             </Tab.Pane>
//             <Tab.Pane eventKey="link-3">
//                 <Table striped bordered hover>
//                     {gradeElements}
//                     <tbody>
//                         {listThirdTables}
//                     </tbody>
//                 </Table>
//             </Tab.Pane>
//             <Tab.Pane eventKey="link-4">
//                 <Table striped bordered hover>
//                     {gradeElements}
//                     <tbody>
//                         {listFourthTables}
//                     </tbody>
//                 </Table>
//             </Tab.Pane>
//         </React.Fragment>
//     )
// }