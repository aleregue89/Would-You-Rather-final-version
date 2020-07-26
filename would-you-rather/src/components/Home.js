import React, {Component} from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import '../styles/Nav.css'
import '../styles/Home.css'
import '../styles/Tab.css'
import UserCard from './UserCard'


class Home extends React.Component {

    // handling TAB event
    handleOpenTab = (event, tabName) => {

        // variable declaration
        let i
        let tabcontent
        let tablinks

        tabcontent = document.getElementsByClassName("tabcontent")
        for (i=0; i < tabcontent.length; i++) {
            tabcontent[i].style.display="none"
        }

        tablinks = document.getElementsByClassName("tablinks")
        for (i=0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "") 
        }

        document.getElementById(tabName).style.display="block"
        event.currentTarget.className += " active"
    }

    render() {

        const {authedUser, answered, unanswered, users} = this.props
        

        if(authedUser === null) {
            return <Login />
        }

        return (
            <div className="home">
                <div className="home-header">
                    <div className="tab">
                        <button id="defaultOpen" className="tablinks" onClick={(event) => {this.handleOpenTab(event, 'unanswered')}}>Unanswered Questions</button>
                        <button className="tablinks" onClick={(event) => {this.handleOpenTab(event, 'answered')}}>Answered Questions</button>
                    </div>
                    <div id="unanswered" className="tabcontent">
                        <ul className="list">
                            {answered.map((question, index) => {
                                if(question.optionOne.votes.includes(authedUser) === false) {
                                    return (
                                        <div key={question.id}>
                                            <UserCard key={index}
                                                      question={question}
                                                      option={question.optionOne}
                                                      users={users}
                                                      unanswered={true}
                                            />
                                        </div>
                                    )    
                                } 
                                return true
                            })}
                        </ul> 
                    </div>
                    <div id="answered" className="tabcontent">
                        <ul className="list">
                            {unanswered.map((question, index) => {
                                if(question.optionOne.votes.includes(authedUser)) {
                                    return (
                                        <UserCard key={question.id}
                                                  question={question}
                                                  option={question.optionOne}
                                                  users={users}
                                                  unanswered={false}
                                        />
                                    )
                                }
                                return true 
                            })}
                        </ul>
                        <ul className="list">
                            {unanswered.map((question, index) => {
                                if(question.optionTwo.votes.includes(authedUser)) {
                                    return (
                                        <UserCard key={index}
                                                  question={question}
                                                  option={question.optionTwo}
                                                  users={users}
                                                  unanswered={false}
                                        />
                                    )
                                }
                                return true
                            })}
                        </ul>
                    </div>
                </div>
                
            </div>
                
        )
    }

}

function mapStateToProps({users, questions, authedUser}) {

    //getting all the answers id from
    const answeredIds = Object.keys(users[authedUser].answers)
    const answered = Object.values(questions).filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)
    const unanswered = Object.values(questions).filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)

    return {
        users: users,
        authedUser,
        answered : answered,
        unanswered: unanswered
    }

}

export default connect(mapStateToProps)(Home)