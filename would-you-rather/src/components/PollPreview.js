import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'


export class PollPreview extends Component {

    // adding state to this component
    state = {
        viewFullPoll : false
    }

    handleClick = event => {
        this.setState(prevState => ({
            viewFullPoll : !prevState.viewFullPoll
        }))
    }

    render() {

        const {question, unanswered} = this.props

        const buttonLabel = unanswered === true ? 'Answer Poll' : 'Results'

        if(this.state.viewFullPoll === true) {
            return <Redirect push to={`/questions/${question.id}`} />
        }

        return (
            <div>
                <h3>Would you rather</h3>
                <p>question
                   <br />
                   or ...
                </p>
                <button className="btn" onClick={this.handleClick}>{buttonLabel}</button>
            </div>
            
        )
    }

}

export default PollPreview