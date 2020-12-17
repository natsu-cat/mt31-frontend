import * as React from 'react';
import { Table, Nav, Tab, Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select'

interface Props {
    userDatas: any;
    outputHandler: Function;
}

class Home extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            /*学生番号一覧 */
            student_number: ["A0~9", "B0~9", "C0~9", "D0~9", "E0~9", "F0~9", "G0~9", "H0~9", "I0~9", "J0~9", "K0~9", "L0~9", "M0~9", "N0~9", "O0~9", "P0~9", "Q0~9", "R0~9", "S0~9", "T0~9", "U0~9", "V0~9", "W0~9", "X0~9", "Y0~9", "Z0~9"],
            select_group: 'A0~9',/*どの学生番号のグループが選ばれたか */
            select_number: null, /*どの学籍番号の人が選ばれたか */
        };
        this.handleChengeGroup = this.handleChengeGroup.bind(this);
        this.handleChengeNumber = this.handleChengeNumber.bind(this);
    }

    handleChengeGroup(event: any) {
        this.setState({ select_group: event.label });
        this.setState({ select_number: null })
    }

    handleChengeNumber(event: any) {
        let split_box = event.value.split("x").map(Number);
        this.setState({ select_number: split_box });
        this.props.outputHandler(split_box);
    }

    render() {
        let group_items;
        let number_items;
        let grade_item;
        group_items = <Col xs="12" sm="12" md="9" lg="9" xl="9">
            {(() => {
                var item = [];
                for (let i = 0; i < this.state.student_number.length; i++) {
                    item.push({ key: i, value: i, label: this.state.student_number[i] })
                }
                return <Select placeholder="グループ" multiple isSearchable onChange={(event) => this.handleChengeGroup(event)} options={item} />
            })()}
        </Col>
        number_items = <Col xs="12" sm="12" md="9" lg="9" xl="9">
            {(() => {
                let index = this.state.student_number.indexOf(this.state.select_group);
                var item = [];
                if (this.props.userDatas.length > index) {
                    for (let i = 0; i < this.props.userDatas[index].length; i++) {
                        for (let y = 0; y < this.props.userDatas[index][i].length; y++) {
                            let suffix = index + 'x' + i + 'x' + y
                            item.push({ key: (i * 10) + y, value: suffix, label: this.props.userDatas[index][i][y][0].student_number })
                        }
                    }
                }
                else {
                    return <Select multiple isSearchable />;
                }
                return <Select placeholder="学籍番号…" multiple isSearchable onChange={(event) => this.handleChengeNumber(event)} options={item} />
            })()}
        </Col>
        if (this.state.select_number != null) {
            grade_item = <Col xs="auto" sm="auto" md="auto" lg="auto" xl="10">
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
                        <Tab.Pane eventKey="link-0">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>科目名</th>
                                        <th>講師</th>
                                        <th>単位</th>
                                        <th>評価</th>
                                        <th>年度</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(() => {
                                        var item = [];
                                        for (let i = 0; i < this.props.userDatas[this.state.select_number[0]][this.state.select_number[1]][this.state.select_number[2]][1].length; i++) {
                                            item.push(
                                                <tr key={i}>
                                                    <td>{this.props.userDatas[this.state.select_number[0]][this.state.select_number[1]][this.state.select_number[2]][1][i].subject_name}</td>
                                                    <td>{this.props.userDatas[this.state.select_number[0]][this.state.select_number[1]][this.state.select_number[2]][1][i].lecture_name}</td>
                                                    <td>{this.props.userDatas[this.state.select_number[0]][this.state.select_number[1]][this.state.select_number[2]][1][i].Units}</td>
                                                    <td>{this.props.userDatas[this.state.select_number[0]][this.state.select_number[1]][this.state.select_number[2]][1][i].evaluation}</td>
                                                    <td>{this.props.userDatas[this.state.select_number[0]][this.state.select_number[1]][this.state.select_number[2]][1][i].Dividend_period}</td>
                                                </tr>
                                            )
                                        }
                                        return item;
                                    })()}
                                </tbody>
                            </Table>
                        </Tab.Pane>

                        <Tab.Pane eventKey="link-1">
                        </Tab.Pane>
                        <Tab.Pane eventKey="link-2">
                        </Tab.Pane>
                        <Tab.Pane eventKey="link-3">
                        </Tab.Pane>
                        <Tab.Pane eventKey="link-4">
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Col>
        }

        return (
            <Container>
                <Row className="justify-content-center test">
                    {group_items}
                </Row >
                <Row className="justify-content-center">
                    {number_items}
                </Row>
                <Row className="justify-content-center">
                    {grade_item}
                </Row>
            </Container>
        );
    }
}
export default Home;