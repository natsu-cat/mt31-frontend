import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//components
//import Default from './Default';
import Login from './Login';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: true};   //リダイレクト処理
    }
    render() {
        //let isLoggedIn = this.state.isLoggedIn;                     //リダイレクト処理
        return (
            <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                {/* <Route path="/" render={() => (            //リダイレクト処理
                    isLoggedIn ? (              
                        < Default/>
                    ) : (
                        <Redirect to="/login" />
                    )
                )} /> */}
            </Switch>
            </BrowserRouter>
        );
    }
}

export default App;