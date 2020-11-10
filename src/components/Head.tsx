import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';

class Head extends React.Component {

    render() {

        return(
            <div className="header">
                <div className="row align-items-center">
                    <div className="col-lg-1 "><h1>rakudai</h1></div>
                    <div className="col-lg-2 header-f">
                        <Form>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Seacrh.."></Form.Control>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="col-lg-2 offset-lg-7 user_info">
                        <FontAwesomeIcon icon={ faUser } />
                        <a>B8219</a>
                        <div className="user_info-d">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic-button">
                                    news
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Action2</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Action3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <Button variant="outline-primary" size="sm" id="header-b">ログアウト</Button>{''}
                    </div>
                </div>
            </div>
        );
    }
}

export default Head;
