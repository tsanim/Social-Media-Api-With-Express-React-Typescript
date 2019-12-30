import React from 'react';
import { Link } from 'react-router-dom';
import UserDataLink from './UserDataLink';
import PropTypes from 'prop-types';

function UserInfoContainer(props) {
    const { posts, followers, subscriptions } = props.user;
    const userId = props.user._id ? props.user._id : props.user.id;
    
    return (
        <div className="userInfoHeader">
            <figure className="profilePic">
                <UserDataLink user={props.user} />
            </figure>
            <div className="headerInfoContainer">
                <div className="userMeta">
                    <span>{posts.length} posts</span>
                    <span><button name="Followers" id="followers" onClick={props.modalShowHandler}>{followers.length} followers</button></span>
                    <span><button name="Subscriptions" id="subscriptions" onClick={props.modalShowHandler}>{subscriptions.length} following</button></span>
                </div>

                {
                    userId === localStorage.getItem('userId')
                        ? <Link to="/edit" className="editBtn">EDIT PROFILE</Link>
                        : (
                            (props.isFollowed
                                ? <button onClick={() => props.unfollowHandler(userId)} className="followBtn">UNFOLLOW</button>
                                : <button onClick={() => props.followHandler(userId)} className="followBtn">FOLLOW</button>)
                        )
                }
            </div>
        </div>
    )
}

UserInfoContainer.propTypes = {
    user: PropTypes.object,
    modalShowHandler: PropTypes.func,
    isFollowed: PropTypes.bool,
    unfollowHandler: PropTypes.func,
    followHandler: PropTypes.func,
}

export default UserInfoContainer;