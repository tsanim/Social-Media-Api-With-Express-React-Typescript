import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../DiscoverComponents/UserCard';

function OnlineUsers(props) {
    const {
        onlineUsers,
    } = props

    return (<div className="onlineUsers">
        <h3>Online users</h3>
        <ul>
            {
                (onlineUsers && onlineUsers.length > 0)
                    ? onlineUsers.map(u => {
                        return (<li key={u._id}>
                            <button id={`${u._id}`} onClick={props.showRoomHandler}>
                                <UserCard
                                    user={u}
                                />
                            </button>
                        </li>)
                    })
                    : null
            }
        </ul>
    </div>
    )
}

OnlineUsers.propTypes = {
    onlineUsers: PropTypes.array,
    showRoomHandler: PropTypes.func
}


export default OnlineUsers;


