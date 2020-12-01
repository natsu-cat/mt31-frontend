import * as React from 'react'
import {Form, Button ,Container, Row, Col} from 'react-bootstrap';

class Upload extends React.Component<any> {

    render() {
        return(
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <Form method="post" data-enctype="multipart/form-data">
                            <Form.Group >
                                <Form.File label="example file input"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">uplaod</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Upload;