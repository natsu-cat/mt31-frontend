import * as React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { postKey, putPwd } from './Auth';

interface Props {

}

class Reregistration extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props)
        this.state = {
            password: '',
            re_password: '',
            isReregistered: false,
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
            let secret_key_str = sessionStorage.getItem("secret_key");
            let secret_key: number = 0;
            if (secret_key_str != null) {
                secret_key = parseInt(secret_key_str, 10);
            }
            postKey(secret_key)
                .then(res => {
                    console.log(res.data);
                    putPwd(res.data.id, this.state.password)
                        .then(res => {
                            console.log(res.data);
                            this.setState({ result: <p className="success"><b>ユーザー登録に成功しました</b></p> });
                            this.setState({ isReregistered: true });
                        }).catch(error => {
                            console.error(error);
                            this.setState({ result: <p className="error"><b>不正なパスワードです</b></p> });
                        });
                }).catch(error => {
                    console.error(error);
                    this.setState({ result: <p className="error"><b>ユーザーが認証できませんでした</b></p> })
                });
        }
    }
    render() {
        if (!this.state.isReregistered) {
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
        else {
            return this.state.result;
        }
    }
}

export default Reregistration;
