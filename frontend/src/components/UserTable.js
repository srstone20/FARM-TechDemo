import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table'
import User from "./User"

export default function UserTable(props) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {props.userList.map(user => <User user={user} />)}
            </tbody>
        </Table>
    );
}