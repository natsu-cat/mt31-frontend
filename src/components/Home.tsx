import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

class Foot extends React.Component {

    render() {
        return(
            <div>
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
                                        <th>単位</th>
                                        <th>評価</th>
                                        <th>年度</th>
                                        <th>教員名</th>
                                        <th>学期</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>コミュニケーション技法</td>
                                        <td>2</td>
                                        <td>不可</td>
                                        <td>2020</td>
                                        <td>Oic 三郎</td>
                                        <td>後期</td>
                                    </tr>
                                    <tr>
                                        <td>システム開発演習</td>
                                        <td>7</td>
                                        <td>優</td>
                                        <td>2020</td>
                                        <td>Oic 二郎</td>
                                        <td>後期</td>
                                    </tr>
                                    <tr>
                                        <td>ゼミナール</td>
                                        <td>2</td>
                                        <td>優</td>
                                        <td>2020</td>
                                        <td>Oic 太郎</td>
                                        <td>後期</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Tab.Pane>

                        <Tab.Pane eventKey="link-1">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>科目名</th>
                                        <th>単位</th>
                                        <th>評価</th>
                                        <th>年度</th>
                                        <th>教員名</th>
                                        <th>学期</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>コミュニケーション技法</td>
                                        <td>2</td>
                                        <td>不可</td>
                                        <td>2020</td>
                                        <td>Oic 三郎</td>
                                        <td>後期</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Tab.Pane>

                        <Tab.Pane eventKey="link-2">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>科目名</th>
                                        <th>単位</th>
                                        <th>評価</th>
                                        <th>年度</th>
                                        <th>教員名</th>
                                        <th>学期</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ゼミナール</td>
                                        <td>2</td>
                                        <td>優</td>
                                        <td>2020</td>
                                        <td>Oic 太郎</td>
                                        <td>後期</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Tab.Pane>

                        <Tab.Pane eventKey="link-3">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>科目名</th>
                                        <th>単位</th>
                                        <th>評価</th>
                                        <th>年度</th>
                                        <th>教員名</th>
                                        <th>学期</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>システム開発演習</td>
                                        <td>7</td>
                                        <td>優</td>
                                        <td>2020</td>
                                        <td>Oic 二郎</td>
                                        <td>後期</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link-4">
                        </Tab.Pane>
                   </Tab.Content>
                </Tab.Container>
            </div>
        );
    }
}

export default Foot;
