import React, {Component} from 'react'
import {connect} from 'react-redux'
import Login from './Login'


class Home extends Component {
    render() {

        const {users, questions, authedUser} = this.props

        if(authedUser === null) {
            return <Login />
        }

        return (
            <div>
                Home page 
            </div>
        )
    }

}

function mapStateToProps(users, questions, authedUser) {
    return {
        users: users,
        authedUser,
    }

}

export default connect(mapStateToProps)(Home)