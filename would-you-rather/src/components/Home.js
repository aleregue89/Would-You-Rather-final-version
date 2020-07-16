import React, {Component} from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import '../styles/Nav.css'
import '../styles/Home.css'
import UserCard from './UserCard'


class Home extends Component {

    // setting state for component
    state = {
        unansweredTab : true,
        answeredTab: false
    }

   // handling onClick events
   handleAnsweredTab = () => {
       this.setState = ({
           unansweredTab : false,
           answeredTab : true
       })
   }

   handleUnansweredTab = () => {
       this.setState = ({
           unansweredTab : true,
           answeredTab : false
       })
   }

    render() {

        const {users, questions, authedUser, answered, unanswered} = this.props
        

        if(authedUser === null) {
            return <Login />
        }

        return (
            <div className="home">
                <div className="home-header">
                    {this.state.unansweredTab === true
                        ? <div className="unanswered-questions-container" onClick={this.handleUnansweredTab}>
                               <h3 className="tab-header">Unanswered Questions</h3>
                        </div>
                        : <div className="unanswered-questions-container" onClick={this.handleUnansweredTab}>
                               <h3>Unanswered Questions</h3>
                        </div>
                    }
                    {this.state.answeredTab === true
                        ? <div className="answered-questions-container" onClick={this.handleAnsweredTab}>
                               <h3 className="tab-header">Answered Questions</h3>
                        </div>
                        : <div className="answered-questions-container" onClick={this.handleAnsweredTab}>
                               <h3>Answered Questions</h3>
                        </div>
                    }
                </div>
                <div className="container">
                    {this.state.unansweredTab === true
                        ? (
                            <div className="unanswered-container">
                                <ul className="list">
                                    {unanswered.map((question, index) => {
                                        if(question.optionOne.votes.includes(authedUser) === false) {
                                            return (
                                                <div key={question.id}>
                                                    <UserCard key={index}
                                                              question={question}
                                                              option={question.optionOne}
                                                              users={users}
                                                    />
                                                </div>
                                            )
                                        }
                                        return true
                                    })}
                                </ul>
                            </div>
                        )
                        : (
                            <div className="answered-container">
                                <ul className="list">
                                    {answered.map((question, index) => {
                                        if(question.optionOne.votes.includes(authedUser)) {
                                            return (
                                                    <UserCard key={question.id}
                                                              question={question}
                                                              option={question.optionOne}
                                                              users={users}
                                                    />
                                            )
                                        }
                                        return true
                                    })}
                                </ul>
                                <ul className="list">
                                    {answered.map((question, index) => {
                                        if(question.optionTwo.votes.includes(authedUser)) {
                                            return (
                                                <UserCard key={question.id}
                                                          question={question}
                                                          option={question.optionTwo}
                                                          users={users}
                                                />
                                            )
                                        }
                                        return true
                                    })}
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
                
        )
    }

}

function mapStateToProps({users, questions, authedUser}) {

    const answeredIds = Object.keys(users[authedUser].answers)
    const answered = Object.values(questions).filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)
    const unanswered = Object.values(questions).filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp -a.timestamp)

    return {
        users: users,
        authedUser,
        answered : answered,
        unanswered: unanswered
    }

}

export default connect(mapStateToProps)(Home)