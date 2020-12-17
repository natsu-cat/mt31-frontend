import * as React from 'react';
import axios from 'axios';
import { Container, Row, Col, Nav, Form, Button } from 'react-bootstrap';

interface Props {
    flag: number;
    username: any;
}
class BBS extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state={
           context: null,
           posts: null,
           loadingf: false,
           limit: 999,
        }
        this.getContext = this.getContext.bind(this);
        this.postContext = this.postContext.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteContext = this.deleteContext.bind(this);
        this.handleChangeLimit = this.handleChangeLimit.bind(this);
    }

    getContext(){
        axios.get("http://localhost:8000/api/contents", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${sessionStorage.getItem("access")}`
            },
        }).then( res =>{
            console.log(res.data);
            this.setState({posts: res.data});
            this.setState({loadingf: true});
        })
    }

    postContext(){
        if(this.state.context != null){
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth();
            month = month +1;
            var day = now.getDate();
            var hour = now.getHours();
            var min = now.getMinutes();
            var sec = now.getSeconds(); 

            var post_time = year+"-"+month+"-"+day+"T"+hour+":"+min+":"+sec+"Z"
            var data ={"poster_name":"","poster_content":this.state.context,"post_data":post_time}
            axios.post("http://localhost:8000/api/contents/",data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${sessionStorage.getItem("access")}`
                }
            });
        }
    }

    deleteContext(id: any){
        axios.delete("http://localhost:8000/api/contents/"+ id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${sessionStorage.getItem("access")}`
            }
        })
        

    }

    handleChange(e: any){
        this.setState({ [e.target.id]: e.target.value});
    }

    handleChangeLimit(e: any){
        this.setState({limit: e});
    }

    componentDidMount() {
        this.getContext();
    }

    render() {
        let post_item;
        let in_page_link;
        if(this.state.loadingf){
            post_item = <div>
                    {(() => {
                        var item = [];
                        var test=0;
                        var delete_button;
                        if( this.state.posts.length == 0){
                            return;
                        }
                        if( this.state.limit <this.state.posts.length ){
                            test= this.state.posts.length - this.state.limit;
                        }
                        for (let i = test; i < this.state.posts.length; i++) {
                            if(this.props.flag == 1){
                                delete_button=  <a href="" onClick={()=>this.deleteContext(this.state.posts[i].poster_id)}>削除</a>
                            }
                            else if(this.state.posts[i].poster_name == this.props.username){
                                delete_button=  <a href="" onClick={()=>this.deleteContext(this.state.posts[i].poster_id)}>削除</a>
                            }
                            
                            item.push(
                                <div key={i}>
                                    <Row className="Contributor">
                                        <Col  xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                                            <a>{i+1} </a>
                                            <a id={i.toString()}>oicちゃんねるからVIPがお送りします </a>
                                            <a>{this.state.posts[i].post_data} </a>
                                            <a>ID:{this.state.posts[i].poster_name} </a>
                                            {delete_button}
                                        </Col>
                                    </Row>
                                    <Row className="Context">
                                        <Col　xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                                            {this.state.posts[i].poster_content}
                                        </Col>
                                    </Row>
                                </div>
                            )
                            delete_button= <div></div>
                        }
                        return item;
                    })()}
                        </div>

            in_page_link = <div>
                        <Row className="justify-content-center">
                            <Nav>
                                <Col  xs="4" sm="4" md="auto" lg="auto" xl="auto"><Nav.Link>{this.state.posts.length}勢い</Nav.Link></Col>
                                <Col  xs="4" sm="4" md="auto" lg="auto" xl="auto"><Nav.Link onClick={() => this.handleChangeLimit(999)}>すべて</Nav.Link></Col>
                                <Col  xs="4" sm="4" md="auto" lg="auto" xl="auto"><Nav.Link onClick={() => this.handleChangeLimit(10)}>最新10</Nav.Link></Col>
                            </Nav>
                        </Row>
                            </div>
        }
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                        <h4>oicちゃんねる</h4>
                    </Col>
                </Row>
                {in_page_link}
                {post_item}
                {in_page_link}
                <Row className="justify-content-center">
                    <Col xs="6" sm="6" md="6" lg="6" xl="6">
                        <Form >
                            <Form.Group controlId="context">
                                <Form.Control placeholder="内容" onChange={this.handleChange}/>
                            </Form.Group>
                            <Button onClick={this.postContext} variant="primary" type="submit">書き込む</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BBS;
