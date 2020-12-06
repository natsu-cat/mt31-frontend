import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Foot extends React.Component {

    render() {
        return (
            <Container className="footer">
                <Row className="aligin-items-center">
                    <Col>
                        <a>Copyright © 2020-2020 MT-31 All Rights Reserved.</a>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Foot;
