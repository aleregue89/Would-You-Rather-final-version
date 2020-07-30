import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSaveQuestionAnswer} from '../actions/users'
import Login from './Login'
import '../styles/PollQuestion.css'
import '../styles/Nav.css'
import ErrorPage from './ErrorPage'

class PollQuestion extends Component {

    // defining component state
    state = {
        value : ''   // I'm using this to get the value of the answer in order to save it
    }

    // handling channge on the form
    handleChange = (event) => {
        event.preventDefault()

        this.setState({
            value : event.target.value
        })
    }

    // handling the submit action
    handleSubmit = (event) => {
        event.preventDefault()

        const{authedUser, question, dispatch} = this.props

        if(this.state.value !== '') {
            dispatch(handleSaveQuestionAnswer(authedUser, question.id, this.state.value))
        } else {
            alert('Please you must select an option')
        }
    }

    handleClick = (event) => {
        event.preventDefault()

        this.props.history.push('/')
    }

    render() {

        const {authedUser, question, totalNumberOfUsers, authedUser_answersArray, authedUser_selectedAnswer, authedUser_unselectedAnswer, question_user} = this.props

        if (authedUser === null) {
            return <Login />
        }

        // defining some variables
        const optionOneVotes = question.optionOne.votes.length
        const optionTwoVotes = question.optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOneAvg = ((optionOneVotes/totalVotes) * 100).toFixed(2)
        const optionTwoAVG = ((optionTwoVotes/totalVotes) * 100).toFixed(2)

        // defining the different Poll-views
        let pollView = ''

        if(question !== undefined) {
            if(authedUser_answersArray.includes(question.id)) {
                pollView = (
                    <div className="answers">
                        <h2>Votes:</h2>
                        <div className="selected-answer">
                            <h5>Would you rather</h5>
                            <h5>{question.optionOne.text} </h5>
                            <h5>{optionOneVotes} out of {totalVotes} votes {optionOneAvg}%</h5>
                        </div>
                        <div className="unselected-answer">
                            <h5>{question.optionTwo.text}</h5>
                            <h5>{optionTwoVotes} out of {totalVotes} votes {optionTwoAVG}%</h5>
                        </div>
                        <h5 className="answer">Your answer: {question[authedUser_selectedAnswer].text}</h5>
                        <div>
                            <button className="back" icon="back" size="mini" onClick={this.handleClick}>Back</button>
                        </div>
                    </div>
                        
                )
            } else {
                pollView = (
                    <form className="options-form" onSubmit={this.handleSubmit}>
                    <h3>Would you rather...</h3>
                        <div>
                            <input 
                                style={{display: 'inline', marginLeft: 10}} 
                                type="radio" 
                                name="option" 
                                value="optionOne"
                                onChange={this.handleChange}
                            /> <p style={{display: 'inline'}}>{question.optionOne.text}</p>
                        </div>
                        <div>
                            <input 
                                style={{display: 'inline', marginLeft: 10}} 
                                type="radio" name="option" 
                                value="optionTwo" 
                                onChange={this.handleChange}
                            /> <p style={{display: 'inline'}}>{question.optionTwo.text}</p>
                        </div>

                        <button className="poll-button" style={{marginTop: 30}}>Submit</button>
                    </form>
                )
            } 
        } else {
            return <ErrorPage />
        }
    
        return (
            <div className="poll-question-container">
                <div className="question-header-container">
                    <h3 className="question-user-header">{question_user.name} asks:</h3>
                </div>
                <div className="question-poll">
                    <div className="question-user-avatar">
                        <img className="question-poll-avatar" alt="avatar" src={question_user.avatarURL}/>
                    </div>

                    <div className="question-form">
                        {pollView}
                    </div>
                </div>
            </div>           
        )
    }

}

function mapStateToProps({authedUser, questions, users}, {match}) {

    //defining number of users
    const totalNumberOfUsers = users.length
    
    // defining question_id
    const {question_id} = match.params

    // defining who is the user for this question
    let user = ''

    if(questions[question_id]) {
        user = questions[question_id].author
    }

    const question_user = users[user]

    // defining authedUser's answers
    let authedUser_selectedAnswer = {}
    let authedUser_unselectedAnswer = {}
    let authedUser_answersArray = []

    if(users[authedUser]) {
        authedUser_selectedAnswer = users[authedUser].answers[question_id]
        authedUser_answersArray = Object.keys(users[authedUser].answers)

        if(questions[question_id].optionOne.votes.includes(authedUser)) {
            authedUser_unselectedAnswer = questions[question_id].optionTwo
        } else if (questions[question_id].optionTwo.votes.includes(authedUser)) {
            authedUser_unselectedAnswer = questions[question_id].optionOne
        }
    }

    return {
        authedUser,
        totalNumberOfUsers,
        question : questions[question_id],
        authedUser_answersArray : authedUser_answersArray,
        authedUser_selectedAnswer : authedUser_selectedAnswer,
        authedUser_unselectedAnswer : authedUser_unselectedAnswer,
        question_user : question_user
    }
}

export default connect(mapStateToProps)(PollQuestion)
