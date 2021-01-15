import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { postUser, getUser } from './Auth';
import '../stylesheets/login.css';

export default class Login extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMessage: '',
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
    sessionStorage.setItem("username", user);
    postUser(user, pwd)
      .then(res => {
        sessionStorage.setItem("access", res.data.access);
        sessionStorage.setItem("refresh", res.data.refresh);
        getUser()
          .then(res => {
            console.log(res.data);
            sessionStorage.setItem("flag", res.data.admin_flag);
            //sessionStorage.setItem("secret_key", res.data.secret_key);    //バックが更新され次第コメントアウト
            sessionStorage.setItem("isLoggedIn", "true");
            location.href = "/home";                                        //認証通ったのでページ遷移する
          }).catch(error => {
            console.error(error);
            sessionStorage.setItem("flag", "-1");
            this.setState({ result: <p className="error"><b>認証に失敗しました。</b></p> })
          });
      }).catch(error => {
        console.error(error.response);
        this.setState({ result: <p className="error"><b>ユーザーネーム、もしくはパスワードが間違っているか、このユーザー名は存在しません。</b></p> });
      });
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <Container>
        <Row className="center">
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <p>
                <b>ログイン</b>
              </p>
              <Form.Group controlId="username">
                {this.state.result}
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
                ログイン
                </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}