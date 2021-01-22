import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//components
import Login from './Login';
import Main from './Main';
import Reregistration from './Reregistration';

class App extends React.Component<any, any> {
    render() {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/change" render={() => (
                        isLoggedIn
                            ? <Redirect to="/" />
                            : <Reregistration />
                    )} />
                    <Route exact path="/login" render={() => (
                        isLoggedIn
                            ? <Redirect to="/" />
                            : <Login />
                    )} />
                    <Route path="/" render={() => (            //リダイレクト処理
                        isLoggedIn
                            ? <Main />
                            : <Redirect to="/login" />
                    )} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;