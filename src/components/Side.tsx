import * as React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';

class Side extends React.Component {

    render() {
        return(
            <Container>
                <Row>
                    <Nav defaultActiveKey="/home">
                        <Col xs="3" sm="auto" md="auto" lg= "auto" xl="12"><Nav.Link href="/"> home </Nav.Link></Col>
                        <Col xs="3" sm="auto" md="auto" lg= "auto" xl="12"><Nav.Link href="/ranking"> ranking </Nav.Link></Col>
                        <Col xs="3" sm="auto" md="auto" lg= "auto" xl="12"><Nav.Link href="/course"> course </Nav.Link></Col>
                        <Col xs="3" sm="auto" md="auto" lg= "auto" xl="12"><Nav.Link href="/about"> about </Nav.Link></Col>
                    </Nav>
                </Row>
            </Container>
        );
    }
}

export default Side;
