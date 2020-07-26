import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Login from './Login'
import '../styles/NewPoll.css'
import { handleSaveQuestion } from '../actions/questions'

class NewPoll extends Component {

    // defining state for this component
    state = {
        optionOne : '',
        optionTwo : '',
        submitted : false
    }

    // handling changes
    handleOptionOne = (event) => {
        event.preventDefault()

        this.setState({
            optionOne : event.target.value
        })
    }

    handleOptionTwo = (event) => {
        event.preventDefault()

        this.setState({
            optionTwo : event.target.value
        })
    }

    // handling submit button
    handleSubmit = (event) => {
        event.preventDefault()

        const {optionOne, optionTwo} = this.state
        const {authedUser, dispatch} = this.props

        new Promise((res, rej) => {
            dispatch(handleSaveQuestion(optionOne, optionTwo, authedUser))
            setTimeout(() => res('completed'), 1000)
        }).then(() => {
            this.setState({
                optionOne : '',
                optionTwo : ''
            })
            this.setState({
                submitted : true
            })
        })
    }

    render() {

        //refactoring the props
        const {authedUser} = this.props

        // redirecting 
        if(authedUser === null) {
            return <Login />
        }

        if(this.state.submitted) {
            return <Redirect to="/" />
        }

        // defining varaibles
        const disabled = this.state.optionOne === '' || this.state.optionTwo === ''

        return (
            <div className="question-container">
                <div className="question-header">
                    <h2>Create New Question Form</h2>
                </div>
                <div>
                    <h5 style={{marginTop: 10, width: 200}}>Complete the question:</h5>
                    <h3 style={{marginTop: 20, marginBottom: 10, width: 200}}>Would you rather...</h3>
                    <form className="question-form" onSubmit={this.handleSubmit}>
                        <input className="question-input" type="text" placeholder="Enter option one..." value={this.state.optionOne} onChange={this.handleOptionOne}></input>
                            <h4 style={{margin: 0, marginTop: 7}}>or</h4>
                        <input className="question-input" type="text" placeholder="Enter option two..." value={this.state.optionTwo} onChange={this.handleOptionTwo}></input>
                        <button className="question-button" type="submit" disabled={disabled}>Submit</button>
                    </form>
                </div>
                
            </div>
            
        )
    }
}

function mapStateToProps({users, questions, authedUser}) {
    return {
        authedUser : authedUser
    }
}

export default connect(mapStateToProps)(NewPoll)