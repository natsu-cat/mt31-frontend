import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Head from './Head';
import Info from './Info';
import Side from './Side';
import Home from './Home';
import Foot from './Foot';


class Main extends React.Component {

    render() {
        return(
            <div>
                <Router>
                    <Head/>
                    <div className="main_item"></div>
                        <div className="row">
                            <div className="col-lg-2">
                                <Side/>
                            </div>
                            <div className="col-lg-7"> 
                                <Route exact path ="/" component={Home}/>
                            </div>
                            <div className="col-lg-2 offset-lg-1">
                                <Info/>
                            </div>
                        </div>
                    <Foot/>
                </Router>
            </div>
        );
    }
}

export default Main;
