import React,  {Component} from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'
import '../styles/UserCard.css'


const UserCard = (props) => {

    const author = props.question.author
    const userAvatar = props.users[author].avatarURL
    const questionText = props.option.text

    return (
        <li className="user-poll-list">
            <div className="user-poll-header">
                <h4 style={{textAlign: "center", color: "lightseagreen", marginTop: 0}}>{author} asks:</h4>
            </div>

            <div className="user-container">
                <img style={{borderRadius:'100%'}} className="avatar" alt="user-avatar"
                     src={userAvatar}
                />
                <div className="question-poll-container">
                    <h3>Would you rather</h3>
                    <p>{questionText}</p>
                    <p>or...</p>
                    <Link to={`/questions/${props.question.id}`} 
                          className="question-poll-button"
                          style={{marginBottom: 20, textDecoration: 'none'}}
                    >View Poll</Link>
                </div>
                
            </div>
        </li>
    )
  
}

export default UserCard
