import axios from 'axios';
import * as React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface Props {

}

class Reregistration extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props)
        this.state = {
            password: '',
            re_password: '',
            result: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit(e: any) {

        e.preventDefault();
        if (this.state.password == '' || this.state.re_password == '') {
            this.setState({ result: <p className="error"><b>エラー： パスワードを入力してください</b></p> });

        }
        else if (this.state.password == this.state.re_password) {

            axios.post("http://localhost:8000/api/keyinquey/", {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${sessionStorage.getItem("access")}`,
                    "key":98765,
                },
            }).then((res) => {
                console.log(res);
            })
        }

    }
    render() {

        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <p><b>パスワード変更</b></p>
                            {this.state.result}
                            <Form.Group controlId="password">
                                <Form.Label>新しいパスワード</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="パスワードを入力してください"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />
                            </Form.Group>
                            <Form.Group controlId="re_password">
                                <Form.Label>新しいパスワード（再入力）</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="パスワードを再入力してください"
                                    onChange={this.handleChange}
                                    value={this.state.re_password}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">パスワード変更</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Reregistration;
