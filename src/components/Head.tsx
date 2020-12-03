import * as React from 'react';
import { Button, Form, Dropdown, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class Head extends React.Component {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: React.MouseEvent<HTMLElement,MouseEvent>) {
        e.preventDefault();
        sessionStorage.clear();
        location.href = "/";
    }

    render() {
        return(
            <Container className="header">
                <Row className="align-items-center">
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto"><h3>成績照会システム</h3></Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="3" className="header-f">
                        <Form>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Seacrh.." className="mr-sm-2"></Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto" className="user_info ml-auto">
                        <FontAwesomeIcon icon={ faUser } />
                        <a>{sessionStorage.getItem("username")}</a>
                        <div className="user_info-d">
                            <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic-button">
                                    news
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Action2</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Action3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Button variant="outline-danger" size="sm" id="header-b" onClick={this.handleClick}>ログアウト</Button>{''}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Head;
