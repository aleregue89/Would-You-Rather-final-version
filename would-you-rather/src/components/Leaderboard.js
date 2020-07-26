import React, {Component} from 'react'
import Login from './Login'
import {connect} from 'react-redux'
import '../styles/Leaderboard.css'

class Leaderboard extends React.Component {
    render() {

        // getting the props
        const {data, authedUser} = this.props

        if(authedUser === null) {
            return <Login />
        }

        return (
            <div style={{marginTop: 60}}>
                {data.map((user, index) => (
                    <div key={user.id} className="card">
                        <div className="user-avatar">
                            <img src={user.avatarURL} alt="user-avatar" style={{borderRadius: '100%', height: 120, marginTop: 60 }}/>
                        </div>

                        <div className="user-stats">
                            <h2 style={{color: "lightseagreen"}}>{user.name}</h2>
                            <h4>Answered Questions: {user.answeredQuestions}</h4>
                            <h4 style={{borderTop: "0.5px solid lightgrey"}}>Created Questions: {user.createdQuestions}</h4>
                        </div>

                        <div className="user-score">
                            <div className="user-score-container">
                                <div className="user-score-header">
                                    <h3 style={{textAlign: "center"}}>Score</h3>
                                </div>
                                <div className="total-score">
                                    <p style={{marginTop: 10, textAlign: "center"}}>{user.totalScore}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {

    const data = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatarURL : user.avatarURL,
            answeredQuestions : Object.values(user.answers).length,
            createdQuestions : user.questions.length,
            totalScore : Object.values(user.answers).length + user.questions.length
        }))
        .sort((a, b) => a.totalScore - b.totalScore)
        .reverse()
        .slice(0, 3)

    return {
        data : data,
        authedUser
    }
}

export default connect(mapStateToProps)(Leaderboard)