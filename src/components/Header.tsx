import * as React from 'react';
import { Button, Form, Dropdown, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class Head extends React.Component {

    render() {

        return(
            <Container className="header">
                <Row xl={12} className="align-items-center">
                    <Col sm={3} lg={2}><h1>rakudai</h1></Col>
                    <Col sm={8} lg={4} className="header-f">
                        <Form>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Seacrh.."></Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col lg={4} xl={2} className="user_info offset-lg-2 offset-xl-4">
                        <FontAwesomeIcon icon={ faUser } />
                        <a>B8219</a>
                        <div className="user_info-d">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic-button">
                                    news
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Action2</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Action3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Button variant="outline-primary" size="sm" id="header-b">ログアウト</Button>{''}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Head;
