import * as React from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';

interface Props {
    flag: number;
}

class Side extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Nav defaultActiveKey="/home">
                        {showElement(this.props.flag)}
                    </Nav>
                </Row>
            </Container>
        );
    }
}

export default Side;

/**
 * ログインしたユーザーが管理者かを判別し、結果によってそれぞれのElementoを返す関数
 */
function showElement(flag: number) {
    /**
     * 管理者か生徒かを判別し、管理者なら管理者用のElementを含めて返し、違ったなら生徒用のElementのみを返す
     */
    if (flag == 1) {
        return (
            <React.Fragment>
                <Col xs="6" sm="6" md="4" lg="12" xl="12"><Nav.Link href="/home"> 成績 </Nav.Link></Col>
                <Col xs="6" sm="6" md="4" lg="12" xl="12"><Nav.Link href="/upload"> アップロード </Nav.Link></Col>
                <Col xs="6" sm="6" md="4" lg="12" xl="12"><Nav.Link href="/bbs"> 掲示板</Nav.Link></Col>
                <Col xs="6" sm="6" md="4" lg="12" xl="12"><Nav.Link href="/about"> 作品について </Nav.Link></Col>
                <Col xs="6" sm="6" md="4" lg="12" xl="12"><Nav.Link href="/registration"> ユーザー登録</Nav.Link></Col>
                <Col xs="6" sm="6" md="4" lg="12" xl="12"><Nav.Link href="/reregistration"> パスワード変更</Nav.Link></Col>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <Col xs="6" sm="6" md="auto" lg="12" xl="12"><Nav.Link href="/home"> 成績 </Nav.Link></Col>
                <Col xs="6" sm="6" md="auto" lg="12" xl="12"><Nav.Link href="/bbs"> 掲示板</Nav.Link></Col>
                <Col xs="6" sm="6" md="auto" lg="12" xl="12"><Nav.Link href="/about">作品について</Nav.Link></Col>
                <Col xs="6" sm="6" md="auto" lg="12" xl="12"><Nav.Link href="/reregistration"> パスワード変更</Nav.Link></Col>
            </React.Fragment>
        );
    }
}