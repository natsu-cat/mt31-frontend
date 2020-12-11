import * as React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select'
import { postGrade, postDepart, postCourse, postStudent, postSubject } from './Auth';
import ReactFileReader from 'react-file-reader';

interface Props {
    flag: number;
}

class Upload extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            upload_url: null,
            select_label: 'インポート先が選択されていません',
            options: [
                { value: "Course", label: "Course" },
                { value: "Depart", label: "Depart" },
                { value: "Grade", label: "Grade" },
                { value: "Student", label: "Studnet" },
                { value: "Subject", label: "Subject" }
            ],
            result: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
        this.post_csv = this.post_csv.bind(this);
    }

    handleChange(event: any) {
        this.setState({ select_label: event.value });
        this.handleChangeUrl(event.value);

    }

    handleChangeUrl(event: any) {
        this.setState({ upload_url: event })
    }

    post_csv(files: any) {

        if (this.state.upload_url != null) {
            const data = new FormData();
            data.append("csv", files[0]);

            switch (this.state.upload_url) {

                case "Course":
                    postCourse(data).catch(error => {
                        console.error(error.response);
                        this.setState({ result: "エラー： ファイルをインポートできませんでした。" });
                    });
                    break;

                case "Depart":
                    postDepart(data).catch(error => {
                        console.error(error.response);
                        this.setState({ result: "エラー： ファイルをインポートできませんでした。" });
                    });
                    break;

                case "Grade":
                    postGrade(data).catch(error => {
                        console.error(error.response);
                        this.setState({ result: "エラー： ファイルをインポートできませんでした。" });
                    });
                    break;

                case "Student":
                    postStudent(data).catch(error => {
                        console.error(error.response);
                        this.setState({ result: "エラー： ファイルをインポートできませんでした。" });
                    });
                    break;

                case "Subject":
                    postSubject(data).catch(error => {
                        console.error(error.response);
                        this.setState({ result: "エラー： ファイルをインポートできませんでした。" });
                    });

            }
            if (this.state.result) {
                alert(this.state.result);
            }
            else {
                alert("import完了");
            }
        }
        else {
            alert("importするファイルの種類を選んでください");
        }
    }

    render() {
        if (this.props.flag != 1) {                      //管理者以外がアクセスした場合の処理
            return null;
        }
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="3" >
                        <Form.Label>improtするファイル選択</Form.Label>
                        <Select isSearchable onChange={(event) => this.handleChange(event)} options={this.state.options} />
                    </Col>
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="7" >
                        <Form onSubmit={this.post_csv}>
                            <Form.Group>
                                <Form.Label>{this.state.select_label}</Form.Label>
                                <ReactFileReader handleFiles={this.post_csv} fileTypes={'.csv'}>
                                    <Button variant="primary" type="submit">uplaod</Button>
                                </ReactFileReader>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Upload;