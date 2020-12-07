import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { postAdmin } from './Auth';

interface Props {
    flag: number;
}

export default class Registration extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let user: string = this.state.username;
        user = user.charAt(0).toUpperCase() + user.slice(1);
        let pwd: string = this.state.password;
        postAdmin(user, pwd)
            .then(() => {
                console.log("ユーザー登録に成功しました");
            }).catch(error => {
                console.error(error.text);
            });
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        if (this.props.flag != 1) {                         //管理者以外がアクセスした場合の処理
            return <a>不正なログイン</a>
        }
        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <p>
                                <b>ユーザー登録</b>
                            </p>
                            <Form.Group controlId="username">
                                <Form.Label>ユーザーネーム</Form.Label>
                                <Form.Control
                                    type="username"
                                    placeholder="ユーザーネームを入力してください"
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>パスワード</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="パスワードを入力してください"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                登録
                </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}