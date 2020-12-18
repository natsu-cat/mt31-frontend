import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//components
import Login from './Login';
import Main from './Main';

class App extends React.Component<any, any> {
    render() {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" render={() => (
                        isLoggedIn ? (
                            <Redirect to="/home" />
                        ) : (
                                <Login />
                            )
                    )} />
                    <Route exact path="/home" render={() => (
                        isLoggedIn ? (
                            <Main />
                        ) : (
                                <Redirect to="/login" />
                            )
                    )} />
                    <Route path="/" render={() => (            //リダイレクト処理
                        isLoggedIn ? (
                            <Redirect to="/home" />
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