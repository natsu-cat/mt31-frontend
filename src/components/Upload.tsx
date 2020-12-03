import * as React from 'react'
import {Form, Button ,Container, Row, Col} from 'react-bootstrap';

interface Props {
    upload_url: string;
    select_f: string;
    select_label: string;
    urls: string[];
}

class Upload extends React.Component<Props, any> {

    constructor(props: Props){
        super(props);
        this.state= {
            upload_url: '',
            select_label: 'インポート先が選択されていません',
            urls: {'Course':'url1','Depart':'url2','Grade':'url3','Student':'url4'}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement>){
        this.setState({select_label: event.target.value})
        this.handleChangeUrl(event.target.value)

    }

    handleChangeUrl(event: any){
        this.setState({upload_url: this.state.urls[event]})
    }


    render() {
        return(
            <Container>
                <Row className="justify-content-center">
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="3" >
                        <Form.Label>improtするファイル選択</Form.Label>
                        <Form.Control as="select" multiple onChange={this.handleChange}>
                            <option value="Course"> Course</option>
                            <option value="Depart"> Depart</option>
                            <option value="Grade"> Grade</option>
                            <option value="Student"> Student</option>
                        </Form.Control>
                    </Col>
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="7" >
                        <Form method="post" data-enctype="multipart/form-data" action={this.state.upload_url}>
                            <Form.Group >
                                <Form.File label={this.state.select_label}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">uplaod</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Upload;