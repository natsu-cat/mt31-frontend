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
            isLoading: false,
            isRegistered: false,
            result: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let user: string = this.state.username;
        user = user.charAt(0).toUpperCase() + user.slice(1);
        let pwd: string = this.state.password;
        if (user.length < 6) {
            this.setState({ result: <p className="error"><b>エラー： ユーザー名は6文字以上入力してください</b></p> })
        }
        else if (!pwd.length) {
            this.setState({ result: <p className="error"><b>エラー： パスワードを入力してください</b></p> });
        }
        else {
            this.setState({ isLoading: true });
            postAdmin(user, pwd)
                .then(() => {
                    this.setState({ result: <p className="success"><b>ユーザー登録に成功しました</b></p> });
                    this.setState({ isRegistered: true });
                }).catch(error => {
                    console.error(error.response);
                    this.setState({ result: <p className="error"><b>エラー: ユーザー名、もしくはパスワードが正しく入力されていないか、このユーザー名は既に存在しています。</b></p> });
                }).finally(() => {
                    this.setState({ isLoading: false });
                });
        }
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        if (this.props.flag != 1) {                             //管理者以外がアクセスした場合の処理
            return null;
        }
        else if (this.state.isLoading) {                        //ローディング画面
            return <a>Loading...</a>
        }
        else if (!this.state.isRegistered) {                    //ユーザー登録画面(認証エラー時の画面)
            return (
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <p>
                                    <b>ユーザー登録</b>
                                </p>
                                {this.state.result}
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
        else {                                                  //ユーザー登録成功時の画面
            return this.state.result;
        }
    }
}