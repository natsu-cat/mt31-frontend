import * as React from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';

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
        let post_item;/*表示する投稿 */
        let in_page_link;/*上下にあるページ内リンクなどのナビゲーター */
        if(this.state.loadingf){
            post_item = <div>
                    {(() => {
                        var item = [];
                        var initial=0; /*何番目の投稿から表示するか */
                        var delete_button;
                        if( this.state.posts.length == 0){
                            return <a>まだ書き込みされていません</a>;
                        }
                        if( this.state.limit <this.state.posts.length ){
                            initial= this.state.posts.length - this.state.limit;
                        }
                        for (let i = initial; i < this.state.posts.length; i++) {
                            if(this.props.flag == 1){/*教員ならすべての投稿の削除ボタン表示 */
                                delete_button=  <Button variant="outline-danger" size="sm"  type="submit" onClick={()=>this.deleteContext(this.state.posts[i].poster_id)}>削除</Button>
                            }
                            else if(this.state.posts[i].poster_name == this.props.username){/*自分の投稿の場合、削除ボタン表示 */
                                delete_button= <Button variant="outline-danger" size="sm"  type="submit" onClick={()=>this.deleteContext(this.state.posts[i].poster_id)}>削除</Button>
                            }
                            
                            item.push(
                                <div key={i}>
                                    <Row className="Contributor">
                                        <Col  xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                                            <a>{i+1} </a>
                                            <a id="vip_title">oicちゃんねるからVIPがお送りします</a>
                                            <a>{this.state.posts[i].post_data} </a>
                                            <a>ID:{this.state.posts[i].poster_name} </a>
                                            {delete_button}
                                        </Col>
                                    </Row>
                                    <Row className="Context">
                                        <Col　xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                                            <a id={(i-1).toString()}>{this.state.posts[i].poster_content}</a>
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
                                <Col  xs="4" sm="4" md="auto" lg="auto" xl="auto"><AnchorLink href={this.state.posts.length-1}>{this.state.posts.length}勢い</AnchorLink></Col>
                                <Col  xs="4" sm="4" md="auto" lg="auto" xl="auto"><a id="bbs_link" onClick={() => this.handleChangeLimit(999)}>すべて</a></Col>
                                <Col  xs="4" sm="4" md="auto" lg="auto" xl="auto"><a id="bbs_link" onClick={() => this.handleChangeLimit(10)}>最新10</a></Col> 
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
                    <Col xs="12" sm="12" md="12" lg="12" xl="6">
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
