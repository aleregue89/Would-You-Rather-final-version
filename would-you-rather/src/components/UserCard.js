import React,  {Component} from 'react'
import {connect} from 'react-redux'
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
                <h5 style={{textAlign: "center"}}>{author} asks:</h5>
            </div>

            <div className="user-container">
                <img style={{borderRadius:'100%'}} className="avatar" alt="user-avatar"
                     src={userAvatar}
                />
                <div className="question-poll-container">
                    <h3>Would you rather</h3>
                    <p>{questionText}</p>
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




/*
// creating parameters for differents POLL types
const typesOfPoll = {
    POLL_SHOW_PREVIEW : 'POLL_SHOW_PREVIEW',
    POLL_SHOW_QUESTION : 'POLL_SHOW_QUESTION',
    POLL_SHOW_VOTES : 'POLL_SHOW_VOTES'
}

// working with the parameters
const PollComponent = props => {

    //refactoring
    const {question, pollType, unanswered} = props

    switch(pollType) {
        case typesOfPoll.POLL_SHOW_PREVIEW :
            return <PollPreview question={question}
                                unanswered={unanswered}
                   />
        case typesOfPoll.POLL_SHOW_QUESTION :
            return <PollQuestion question={question}/>
        case typesOfPoll.POLL_SHOW_VOTES :
            return <PollVotes question={question}/>
        default :
            return 
    }
}

function mapStateToProps({users, questions, authedUser}, {match, question_id}) {

    //declaring variables
    let question
    let pollType
    
    // defining which Poll view user will receive
    if(question_id !== undefined) {
        question = questions[question_id]
        pollType = typesOfPoll.POLL_SHOW_PREVIEW
    } else {
        // getting the question.id from the URL
        const {question_id} = match.params
        question = questions[question_id]
        const user = users[authedUser]
        pollType = typesOfPoll.POLL_SHOW_QUESTION

        if(Object.keys(user.answers).includes(question.id)) {
            pollType = typesOfPoll.POLL_SHOW_VOTES
        }

    }
    const author = users[question.author]

    return {
        question,
        author,
        pollType
    }
}

export default connect(mapStateToProps)(UserCard)
*/