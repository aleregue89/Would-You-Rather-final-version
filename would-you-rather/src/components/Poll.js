import React from 'react'
import {connect} from 'react-redux'
import {handleSaveQuestionAnswer} from '../actions/shared'
import Login from './Login'

class Poll extends React.Component {

    // setting the state for this component
    state = {
        value : ''
    }

    render() {

        const {authedUser, questions, users, qid} = this.props

        if(authedUser === null) {
            return <Login />
        }

        return (
            <div>
                Poll
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {match}) {

    // getting the question.id from the URL
    const {qid} = match.params

    // working with the data
    

    return {
        authedUser,
        qid
    }

}

export default connect(mapStateToProps)(Poll)