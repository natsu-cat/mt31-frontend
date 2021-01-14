import * as React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface Props {
    username: String;
}

class Head extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();
        sessionStorage.clear();
        location.href = "/login";
    }

    render() {
        return (
            <Container className="header">
                <Row className="align-items-center">
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto"><h3>成績照会システム</h3></Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="3" className="header-f">
                        <Form>
                            
                        </Form>
                    </Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto" className="user_info ml-auto">
                        <FontAwesomeIcon icon={faUser} />
                        <a>{this.props.username}</a>
                        
                        <Button variant="outline-danger" size="sm" id="header-b" onClick={this.handleClick}>ログアウト</Button>{''}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Head;
