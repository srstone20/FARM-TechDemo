import axios from 'axios';
import React from 'react';

function UserItem(props) {
    return (
        <tr>
            <td>
                {props.user.id}
            </td>
            <td>
                {props.user.name}
            </td>
        </tr>
    )
}

export default UserItem