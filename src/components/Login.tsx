import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import '../stylesheets/login.css';

interface Props {
  email: string;
  password: string;
  errMessage: string;
  isLoggedIn: boolean;
}

export default class Login extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errMessage: '',
      isLoggedIn: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let email = (document.getElementById('email') as HTMLInputElement).value;
    let password = (document.getElementById('password') as HTMLInputElement).value;
    console.log("email=" + email);
    console.log("password" + password);
    location.href = "/";
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
              <Form.Group controlId="email">
                <Form.Label>メールアドレス</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="メールアドレスを入力してください"
                  onChange={this.handleChange}
                  value={this.state.email}
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