import * as React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';

class Side extends React.Component {
    constructor(props: any) {
        super(props);
        
    }

    render() {
        return(
            <Container>
                <Row className="justify-content-center">
                    <Nav defaultActiveKey="/home">
                        <ShowElement />
                    </Nav>
                </Row>
            </Container>
        );
    }
}

export default Side;

/**
 * 管理者か生徒かを判別し、それぞれにElementoを返す関数
 */
function ShowElement() {
    const flag = localStorage.getItem("flag");
    /**
     * 管理者か生徒かを判別し、管理者なら管理者用のElementを含めて返し、違ったなら生徒用のElementのみを返す
     */
    if(flag == "1") {
        return (
            <React.Fragment>
                <Col xs="4" sm="4" md="auto" lg= "auto" xl="12"><Nav.Link href="/"> home </Nav.Link></Col>
                <Col xs="4" sm="4" md="auto" lg= "auto" xl="12"><Nav.Link href="/ranking"> ranking </Nav.Link></Col>
                <Col xs="4" sm="4" md="auto" lg= "auto" xl="12"><Nav.Link href="/course"> course </Nav.Link></Col>
                <Col xs="4" sm="4" md="auto" lg= "auto" xl="12"><Nav.Link href="/about"> about </Nav.Link></Col>
                <Col xs="4" sm="4" md="auto" lg= "auto" xl="12"><Nav.Link href="/upload"> upload </Nav.Link></Col>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Col xs="3" sm="auto" md="auto" lg= "auto" xl="12"><Nav.Link href="/"> home </Nav.Link></Col>
                <Col xs="3" sm="auto" md="auto" lg= "auto" xl="12"><Nav.Link href="/ranking"> ranking </Nav.Link></Col>
                <Col xs="3" sm="auto" md="auto" lg= "auto" xl="12"><Nav.Link href="/course"> course </Nav.Link></Col>
                <Col xs="3" sm="auto" md="auto" lg= "auto" xl="12"><Nav.Link href="/about"> about </Nav.Link></Col>
            </React.Fragment>
        );
    }
}