import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class About extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Container className="about_item">
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <h3 className="title_center">成績照会システムについて</h3>
                    </Col>
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                        <a>
                            現在本校では成績の開示が半年に一度紙面でのみ行われており、またその開示機会以外では、自らの成績を知る術がなく不便な時が多々ある。
                            そのためブラウザで自らの成績を確認できるのと同時に、教員側でも成績の管理ができるようなwebアプリケーションである
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <h4 className="title_center">開発環境</h4>
                    </Col>
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                        <a>PyCharm  Python(Django)  VisualStudioCode  TypeScript(React.js)</a>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <h4 className="title_center">開発メンバー</h4>
                    </Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto">3C01KS 岩本 貴史</Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto">3C03KS 大石 朋輝</Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto">3C05KS 木下 陽裕</Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto">3C14KS 栂井 佑介</Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto">3C15KS 永田 脩二</Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto">3C17KS 中村 徹</Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto">3C23KW 石山 慧</Col>
                    <Col xs="12" sm="auto" md="auto" lg="auto" xl="auto">3C29KW 信尾 海翔</Col>
                </Row>
            </Container>
        );
    }
}

export default About;
