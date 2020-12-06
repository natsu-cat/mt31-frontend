import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { postUser } from './Auth';
import '../stylesheets/login.css';

export default class Login extends React.Component<any, any> {

  constructor(props: any) {
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
    sessionStorage.setItem("username", user);
    postUser(user, pwd);
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