import * as React from 'react'
import { Nav,Tab,Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select'
import { postGrade, postDepart, postCourse, postStudent, postSubject } from './Auth';
import ReactFileReader from 'react-file-reader';
import axios from "axios";
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
            download: null,
            result: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
        this.post_csv = this.post_csv.bind(this);
        this.conversion_csv = this.conversion_csv.bind(this);
        this.handle_download = this.handle_download.bind(this);
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

    conversion_csv(files: any){

        const data = new FormData();
        data.append("changefile", files[0]);

        axios.post("http://localhost:8000/api/teacher/change/", data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${sessionStorage.getItem("access")}`
                },
                responseType: 'blob',
            }).then((res) => {
                console.log(res.data);
                this.handle_download(res);
                
            })
    }

    handle_download(res: any){
        var blob = new Blob([res.data], { "type": "application/zip"});

        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob , "csv.zip");
        }
        else{
            this.setState({download: <a id="download" href="#" download="csv.zip">ダウンロード</a>});
            document.getElementById("download").href = window.URL.createObjectURL(blob)
        }
    }

    render() {
        if (this.props.flag != 1) {                      //管理者以外がアクセスした場合の処理
            return null;
        }
        return (
            <Container>
                <Tab.Container defaultActiveKey="first">

                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link eventKey="first">アップロード</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">csv変換</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
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
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <Row className="justify-content-center">
                                <Col xs="auto" sm="auto" md="auto" lg="auto" xl="7" >
                                    <Form onSubmit={this.post_csv}>
                                        <Form.Group>
                                            <Form.Label>ファイルを選択してください</Form.Label>
                                            <ReactFileReader handleFiles={this.conversion_csv} fileTypes={'.xlsx'}>
                                                <Button variant="primary" type="submit">conversion</Button>
                                            </ReactFileReader>
                                            {this.state.download}
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
        );
    }
}

export default Upload;