import * as React from 'react';
import Nav from 'react-bootstrap/Nav';

class Side extends React.Component {

    render() {
        return(
            <div>
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link href="/"> home </Nav.Link>
                    <Nav.Link href="/ranking"> ranking </Nav.Link>
                    <Nav.Link href="/course"> course </Nav.Link>
                    <Nav.Link href="/about"> about </Nav.Link>
                </Nav>

            </div>
        );
    }
}

export default Side;
