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

    handleOnLoad = (event, tagId) => {
        event.preventDefault()

        document.getElementById(tagId).click()
    }

    render() {

        const {authedUser, answered, unanswered, users} = this.props
        

        if(authedUser === null) {
            return <Login />
        }

        return (
            <div className="home" onLoad={(event) => {this.handleOnLoad(event, 'defaultOpen')}}>
                <div className="home-header">
                    <div className="tab">
                        <button id="defaultOpen" onLoad={this.handleOnLoad} className="tablinks" onClick={(event) => {this.handleOpenTab(event, 'unanswered')}} style={{color: "lightseagreen"}}>Unanswered Questions</button>
                        <button className="tablinks" onClick={(event) => {this.handleOpenTab(event, 'answered')}} style={{color: "lightseagreen"}}>Answered Questions</button>
                    </div>
                    <div id="unanswered" className="tabcontent">
                        <ul className="list">
                            {unanswered.map((question, index) => {
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
                            {answered.map((question, index) => {
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
                            {answered.map((question, index) => {
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

    // mapping the questions 
    let arrayOfQuestions = Object.keys(questions).map(key => questions[key])
    // I will be deducting the answers[authedUser] from here
    let arraySet = new Set(arrayOfQuestions)

    let arrayOfAnswers = []
    if(authedUser !== null) {

        arrayOfAnswers = Object.keys(users[authedUser].answers).map(key => {
            return questions[key]
        })

        // deleting the answers[authedUser] from the arraySet
        arrayOfAnswers.map((answeredQuestion) => {
            return arraySet.delete(answeredQuestion)
        })
    }

    //defining my unanswered questions
    let unansweredQuestions = [...arraySet]

    // sorting my answered and unanswered questions
    let answered = arrayOfAnswers.sort((a, b) => b.timestamp - a.timestamp)
    let unanswered = unansweredQuestions.sort((a, b) => b.timestamp - a.timestamp)

    return {
        users: users,
        authedUser,
        answered : answered,
        unanswered: unanswered
    }

}

export default connect(mapStateToProps)(Home)