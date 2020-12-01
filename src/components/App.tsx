import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//components
//import Default from './Default';
import Login from './Login';
import Main from './Main';
class App extends React.Component<any,any> {
    render() {
        let isLoggedIn = localStorage.getItem("isLoggedIn");              //リダイレクト処理

        return (
            <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/" render={() => (            //リダイレクト処理
                     isLoggedIn ? (              
                         < Main/>
                     ) : (
                        <Redirect to="/login" />
                    )
                )} />
            </Switch>
            </BrowserRouter>
        );
    }
}

export default App;