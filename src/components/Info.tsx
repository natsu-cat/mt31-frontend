import * as React from 'react';
import Table from 'react-bootstrap/Table';

class Info extends React.Component {

    render() {
        return(
            <div className="info">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>学年</th>
                            <th>進級単位</th>
                            <th>獲得単位</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>35</td>
                            <td>40</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>70</td>
                            <td>78</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>100</td>
                            <td>105</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>120</td>
                            <td>105</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Info;
