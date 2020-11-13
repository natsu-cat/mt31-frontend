import * as React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Head from './Header';
//import Head from './Head';
import Info from './Info';
import Side from './Side';
import Home from './Home';
import Foot from './Footer'
//import Foot from './Foot';


class Main extends React.Component {

    render() {
        return (
            <Router>
                <Container fluid="md" id="wrap">
                    <Head />
                    <Row className="main_item"></Row>
                    <Row>
                        <Col lg={2}>
                            <Side />
                        </Col>
                        <Col lg={7}>
                            <Route exact path="/" component={Home} />
                        </Col>
                        <Col lg={2}>
                            <Info />
                        </Col>
                    </Row>
                    <Foot />
                </Container>
            </Router>

        );
    }
}

export default Main;
