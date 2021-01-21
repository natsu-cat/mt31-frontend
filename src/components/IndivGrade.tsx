import * as React from 'react';
import { Nav, Tab, Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { getAdmis } from './GetAdmis';
import { sortEvaluation, sortSemester } from './Sort';

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
                    {showIndivGrade(this.props.userDatas, this.props.username)}
                </Tab.Container>
            </Container>
        );
    }
}

function showIndivGrade(userDatas: any, username: string) {
    const ADMIS_YEARS = getAdmis(username);
    const allData = [];
    const firstData = [];
    const secondData = [];
    const therdData = [];
    const fourthData = [];
    for (let i in userDatas[0]) {
        const SUBJECT_YEARS = parseInt(userDatas[0][i].Dividend_period.slice(2, 4), 10);
        allData.push(userDatas[0][i]);
        switch (SUBJECT_YEARS - ADMIS_YEARS) {
            case 0:
                firstData.push(userDatas[0][i]);
                break;
            case 1:
                secondData.push(userDatas[0][i]);
                break;
            case 2:
                therdData.push(userDatas[0][i]);
                break;
            case 3:
                fourthData.push(userDatas[0][i]);
                break;
        }
    }
    const columns = [
        { dataField: "grade_id", text: "ID", hidden: true },
        { dataField: "subject_name", text: "科目名", sort: true, editable: false },
        { dataField: "lecture_name", text: "講師", sort: true, editable: false },
        {
            dataField: "Units",
            text: "単位",
            sort: true,
            sortFunc: (a: any, b: any, order: any) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b; // desc
            },
            editable: false
        },
        {
            dataField: "evaluation",
            text: "評価",
            sort: true,
            sortFunc: (a: any, b: any, order: any) => {
                const main = sortEvaluation(a.toString());
                const sub = sortEvaluation(b.toString());
                if (order === 'asc') {
                    if (main < sub) {
                        return -1;
                    } else if (main > sub) {
                        return 1;
                    }
                }
                if (main < sub) {
                    return 1;
                } else if (main > sub) {
                    return -1;
                }
                return 0;
            },
            editable: false
        },
        {
            dataField: "Dividend_period",
            text: "年度",
            sort: true,
            sortFunc: (a: any, b: any, order: any) => {
                const main = sortSemester(a.toString());
                const sub = sortSemester(b.toString());
                if (order === 'asc') {
                    if (main < sub) {
                        return -1;
                    } else if (main > sub) {
                        return 1;
                    }
                }
                if (main < sub) {
                    return 1;
                } else if (main > sub) {
                    return -1;
                }
                return 0;
            },
            editable: false
        },
    ];
    const defaultSorted: any = [{
        dataField: "Dividend_period",
        order: "asc"
    }];
    const indication: string = "この学年の成績はありません";
    return (
        <Tab.Content>
            <Tab.Pane eventKey="link-0">
                <BootstrapTable
                    data={allData}
                    columns={columns}
                    keyField="grade_id"
                    striped
                    hover
                    bootstrap4
                    bordered
                    defaultSorted={defaultSorted}
                />
            </Tab.Pane>
            <Tab.Pane eventKey="link-1">
                <BootstrapTable
                    data={firstData}
                    columns={columns}
                    keyField="grade_id"
                    striped
                    hover
                    bootstrap4
                    bordered
                    defaultSorted={defaultSorted}
                    noDataIndication={indication}
                />
            </Tab.Pane>
            <Tab.Pane eventKey="link-2">
                <BootstrapTable
                    data={secondData}
                    columns={columns}
                    keyField="grade_id"
                    striped
                    hover
                    bootstrap4
                    bordered
                    defaultSorted={defaultSorted}
                    noDataIndication={indication}
                />
            </Tab.Pane>
            <Tab.Pane eventKey="link-3">
                <BootstrapTable
                    data={therdData}
                    columns={columns}
                    keyField="grade_id"
                    striped
                    hover
                    bootstrap4
                    bordered
                    defaultSorted={defaultSorted}
                    noDataIndication={indication}
                />
            </Tab.Pane>
            <Tab.Pane eventKey="link-4">
                <BootstrapTable
                    data={fourthData}
                    columns={columns}
                    keyField="grade_id"
                    striped
                    hover
                    bootstrap4
                    bordered
                    defaultSorted={defaultSorted}
                    noDataIndication={indication}
                />
            </Tab.Pane>
        </Tab.Content>
    )
}