import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'
import '../styles/UserCard.css'


const UserCard = (props) => {    // passing the props from Home.js
    return (
        <li className="user-poll-list">
            <div className="user-poll-header">
                <h5>{props.question.author} asks:</h5>
            </div>

            <div className="user-container">
                <img style={{borderRadius:'100%'}} className="avatar" alt="user-avatar"
                     src={props.users[props.question.author].avatarURL}
                />
                <div className="user-poll-container">
                    <h3>Would you rather</h3>
                    <p>
                        {props.option.text}
                        <br />
                        or ...
                    </p>
                    <Link to={`/questions/${props.question.id}`} className="poll-button" 
                          style={{marginBottom: 20, textDecoration: 'none'}}>View Poll</Link>
                </div>
            </div>
        </li>
    )
    
}

export default UserCard