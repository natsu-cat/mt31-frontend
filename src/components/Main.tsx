import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
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
import Reregistration from "./Reregistration";
import About from "./About";

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
                    console.log(res.data);
                }).catch(error => {
                    console.error(error.response);
                    this.setState({ result: <p className="error"><b>成績情報を取得できませんでした。</b></p> });
                }).finally(() => this.setState({ isLoading: false }));
        }
        else if (this.state.flag == 1) {                             //管理者の場合の処理
            getSourtGrade()
                .then(res => {
                    this.setState({ userDatas: res.data });
                    console.log(res.data);
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
                    <Row className="main_item">
                        <Col lg="2">
                            <Side flag={this.state.flag} />
                        </Col>
                        <Route exact path="/" render={() => (
                            <Redirect to="/home" />
                        )} />
                        <Route exact path="/home" render={() => (
                            <React.Fragment>
                                <Col lg="10" xl="7">
                                    <Home userDatas={this.state.userDatas}
                                        isLoading={this.state.isLoading}
                                        flag={this.state.flag}
                                        username={this.state.username}
                                        result={this.state.result}
                                        outputHandler={this.outputEvent}
                                    />
                                </Col>
                                <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                                    <Info userDatas={this.state.userDatas}
                                        isLoading={this.state.isLoading}
                                        flag={this.state.flag}
                                        username={this.state.username}
                                        studentNum={this.state.studentNum}
                                    />
                                </Col>
                            </React.Fragment>
                        )} />
                        <Col>
                            <Route exact path="/upload" render={() => <Upload flag={this.state.flag} />} />
                            <Route exact path="/registration" render={() => <Registration flag={this.state.flag} />} />
                            <Route exact path="/bbs" render={() => <BBS flag={this.state.flag} username={this.state.username} />} />
                            <Route exact path="/reregistration" render={() => <Reregistration />} />
                            <Route exact path="/about" render={() => <About />} />
                        </Col>
                    </Row>
                    <Foot />
                </Container>
            </Router>

        );
    }
}

export default Main;
