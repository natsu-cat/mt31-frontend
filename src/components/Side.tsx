import * as React from 'react';
import { Link }  from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

class Side extends React.Component {

    render() {
        return(
            <div>
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link> <Link to="/">home</Link> </Nav.Link>
                    <Nav.Link> <Link to="/ranking">ranking</Link> </Nav.Link>
                    <Nav.Link> <Link to="/course">course</Link> </Nav.Link>
                    <Nav.Link> <Link to="/About">about</Link> </Nav.Link>
                </Nav>

            </div>
        );
    }
}

export default Side;
