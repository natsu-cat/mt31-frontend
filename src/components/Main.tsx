import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Head from './Head';
import Info from './Info';
import Side from './Side';
import Home from './Home';
import Foot from './Foot';
import Upload from './Upload';
import Registration from './Registration';
import { getSourtGrade, getIndivGrade } from './Auth';
import BBS from './BBS'

class Main extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: sessionStorage.getItem("username"),
            isLoading: true,
            userDatas: [],
            flag: sessionStorage.getItem("flag"),
            studentNum: null,
            result: null
        }
        this.outputEvent = this.outputEvent.bind(this);
    }
    outputEvent(student: string) {
        this.setState({ studentNum: student });
    }
    componentDidMount() {
        if (this.state.flag == 0) {                                  //生徒の場合の処理
            getIndivGrade()
                .then(res => {
                    this.setState({ userDatas: res.data });
                }).catch(error => {
                    console.error(error.response);
                    this.setState({ result: <p className="error"><b>成績情報を取得できませんでした。</b></p> });
                }).finally(() => this.setState({ isLoading: false }));
        }
        else if (this.state.flag == 1) {                             //管理者の場合の処理
            getSourtGrade()
                .then(res => {
                    this.setState({ userDatas: res.data });
                }).catch(error => {
                    console.error(error.response);
                    this.setState({ result: <p className="error"><b>成績情報を取得できませんでした。</b></p> });
                }).finally(() => this.setState({ isLoading: false }));
        }
        else {                                                       //例外処理
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <Router>
                <Container fluid="md" id="wrap">
                    <Head username={this.state.username} />
                    <Row className="main_item"></Row>
                    <Row>
                        <Col lg="2">
                            <Side flag={this.state.flag} />
                        </Col>
                        <Col lg="7">
                            <Route exact path="/home" render={() => (
                                <Home userDatas={this.state.userDatas}
                                    isLoading={this.state.isLoading}
                                    flag={this.state.flag}
                                    username={this.state.username}
                                    result={this.state.result}
                                    outputHandler={this.outputEvent} />)} />
                            <Route exact path="/upload" render={() => <Upload flag={this.state.flag} />} />
                            <Route exact path="/registration" render={() => <Registration flag={this.state.flag} />} />
                            <Route exact path="/bbs" render={() => <BBS flag={this.state.flag} username={this.state.username} />} />
                        </Col>
                        <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                            <Info userDatas={this.state.userDatas}
                                isLoading={this.state.isLoading}
                                flag={this.state.flag}
                                username={this.state.username}
                                studentNum={this.state.studentNum} />
                        </Col>
                    </Row>
                    <Foot />
                </Container>
            </Router>

        );
    }
}

export default Main;
