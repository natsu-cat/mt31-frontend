import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { postUser, getUser } from './Auth';

import '../stylesheets/login.css';

interface Props {
  username: string;
  password: string;
  errMessage: string;
  isLoggedIn: boolean;
}

export default class Login extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMessage: '',
      isLoggedIn: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let user = (document.getElementById('username') as HTMLInputElement).value;
    let pwd = (document.getElementById('password') as HTMLInputElement).value;
    if (postUser(user, pwd )) {
      this.setState({ isLoggedIn: true});
      let flag = getUser();
    }
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
              {/*<h3>成績紹介システム</h3>*/}
              <p>
                <b>ログイン</b>
              </p>
              <Form.Group controlId="username">
                <Form.Label>ユーザーネーム</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="メールアドレスを入力してください"
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