import * as React from 'react';
import { Nav, Tab, Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Select from 'react-select'
import { getAdmis, getUserArray } from './GetAdmis';
import { sortEvaluation, sortSemester } from './Sort';

interface Props {
    userDatas: [];
    outputHandler: Function;
}

class Home extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            /*学生番号一覧 */
            select_number: null, /*どの学籍番号の人が選ばれたか */
            isAll: false    /*全データ表示の画面かどうか */
        };
        this.handleChengeNumber = this.handleChengeNumber.bind(this);
        this.handleChangeAllGRade = this.handleChangeAllGRade.bind(this);
    }

    handleChengeNumber(event: any) {
        let split_box = getUserArray(event.value);
        this.setState({ select_number: split_box });
        this.props.outputHandler(split_box);
    }

    handleChangeAllGRade() {
        this.state.isAll
            ? this.setState({ isAll: false })
            : this.setState({ isAll: true })
    }

    render() {
        if (this.state.isAll) {
            return (
                <Container>
                    {showAllGradeItems(this.props.userDatas, this.handleChangeAllGRade)}
                </Container>
            );
        } else {
            return (
                <Container>
                    <ButtonGroup toggle>
                        <Button variant="outline-primary" onClick={this.handleChangeAllGRade}>全成績</Button>
                        <Button variant="outline-primary" active>生徒別</Button>
                    </ButtonGroup>
                    {showNumberItems(this.state.select_number, this.handleChengeNumber, this.props.userDatas)}
                    {showGradeItems(this.state.select_number, this.props.userDatas)}
                </Container>
            );
        }
    }
}
export default Home;

function showAllGradeItems(userDatas: any, changeHandler: () => void) {
    const data = [];
    for (let idx1 in userDatas) {
        for (let idx2 in userDatas[idx1]) {
            for (let idx3 in userDatas[idx1][idx2]) {
                for (let idx4 in userDatas[idx1][idx2][idx3][1]) {
                    data.push(Object.assign({}, userDatas[idx1][idx2][idx3][0], userDatas[idx1][idx2][idx3][1][idx4]));
                }
            }
        }
    }
    const columns = [
        {
            dataField: "grade_id",
            text: "ID",
            sort: true,
            sortFunc: (a: any, b: any, order: any) => {
                const numA: number = parseInt(a, 10);
                const numB: number = parseInt(b, 10);
                if (order === 'asc') {
                    if (numA < numB) {
                        return 1;
                    } else if (numA > numB) {
                        return -1;
                    }
                }
                if (numA < numB) {
                    return -1;
                } else if (numA > numB) {
                    return 1;
                }
                return 0;
            },
            editable: false,
            filter: textFilter(),
            hidden: true
        },
        { dataField: "student_number", text: "学籍番号", sort: true, editable: false, filter: textFilter() },
        { dataField: "subject_name", text: "科目名", sort: true, editable: false, filter: textFilter() },
        { dataField: "lecture_name", text: "講師", sort: true, editable: false, filter: textFilter() },
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
            editable: false,
            filter: textFilter()
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
            editable: false,
            filter: textFilter()
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
            editable: false,
            filter: textFilter()
        },
    ];
    const defaultSorted: any = [{
        dataField: "student_number",
        order: "asc"
    }];
    const grade_items: JSX.Element[] = new Array();
    grade_items.push(<React.Fragment>
        <ButtonGroup toggle>
            <Button variant="outline-primary" active>全成績</Button>
            <Button variant="outline-primary" onClick={changeHandler}>生徒別</Button>
        </ButtonGroup>
        <BootstrapTable
            data={data}
            columns={columns}
            keyField="grade_id"
            striped
            hover
            bootstrap4
            bordered
            defaultSorted={defaultSorted}
            pagination={paginationFactory()}
            filter={filterFactory()}
        />
    </React.Fragment>);
    return (
        <React.Fragment>
            {grade_items}
        </React.Fragment>
    );
}

function showNumberItems(select_number: number[], changeHandler: Function, userDatas: any) {
    let placeholder: string = "学籍番号…";
    if (select_number) {
        placeholder = userDatas[select_number[0]][select_number[1]][select_number[2]][0].student_number;
    }
    const number_items = <Col xs="12" sm="12" md="9" lg="9" xl="9">
        {(() => {
            let cnt = 0;
            const items = [];
            for (let idx1 in userDatas) {
                for (let idx2 in userDatas[idx1]) {
                    for (let idx3 in userDatas[idx1][idx2]) {
                        let sNumber = userDatas[idx1][idx2][idx3][0].student_number;
                        items.push({ key: cnt, value: sNumber, label: sNumber });
                        cnt++;
                    }
                }
            }
            return <Select placeholder={placeholder} multiple isSearchable onChange={(event) => changeHandler(event)} options={items} />
        })()}
    </Col>
    return (
        <Row className="justify-content-center">
            {number_items}
        </Row>
    );
}

function showGradeItems(selectNum: number[], userDatas: any) {
    const grade_item: JSX.Element[] = new Array();
    if (selectNum != null) {
        grade_item.push(
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
        );
        const ADMIS_YEARS = getAdmis(userDatas[selectNum[0]][selectNum[1]][selectNum[2]][0].student_number);
        const allData = [];
        const firstData = [];
        const secondData = [];
        const therdData = [];
        const fourthData = [];
        for (let i in userDatas[selectNum[0]][selectNum[1]][selectNum[2]][1]) {
            const SUBJECT_YEARS = parseInt(userDatas[selectNum[0]][selectNum[1]][selectNum[2]][1][i].Dividend_period.slice(2, 4), 10);
            allData.push(userDatas[selectNum[0]][selectNum[1]][selectNum[2]][1][i]);
            switch (SUBJECT_YEARS - ADMIS_YEARS) {
                case 0:
                    firstData.push(userDatas[selectNum[0]][selectNum[1]][selectNum[2]][1][i]);
                    break;
                case 1:
                    secondData.push(userDatas[selectNum[0]][selectNum[1]][selectNum[2]][1][i]);
                    break;
                case 2:
                    therdData.push(userDatas[selectNum[0]][selectNum[1]][selectNum[2]][1][i]);
                    break;
                case 3:
                    fourthData.push(userDatas[selectNum[0]][selectNum[1]][selectNum[2]][1][i]);
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
        grade_item.push(
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
    return (
        <Tab.Container defaultActiveKey="link-0">
            {grade_item}
        </Tab.Container>
    )
}