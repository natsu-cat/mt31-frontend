import * as React from 'react';
// import Table from 'react-bootstrap/Table';
// import Nav from 'react-bootstrap/Nav';
// import Tab from 'react-bootstrap/Tab';
// import { Container } from 'react-bootstrap';
import IndivGrade from './IndivGrade';
import AllGrade from './AllGrade';

interface Props {
    isLoading: Boolean;
    userDatas: [];
    flag: number;
    username: string;
    result: JSX.Element;
}

class Home extends React.Component<Props, any> {
    render() {
        const style: React.CSSProperties = { top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" };
        if (this.props.isLoading) {                         //Ajax認証が終わっていない間の処理
            return (
                <div style={style}>
                    <a>Loading...</a>
                </div>
            );
        } else if (this.props.result) {                    //エラーだった場合の処理
            return this.props.result;
        } else if (this.props.flag == 0) {                  //生徒の場合
            return <IndivGrade userDatas={this.props.userDatas} username={this.props.username} />
        } else if (this.props.flag == 1) {                  //管理者の場合
            return <AllGrade userDatas={this.props.userDatas} />
        } else {                                            //例外処理
            return null;
        }
    }
}

export default Home;