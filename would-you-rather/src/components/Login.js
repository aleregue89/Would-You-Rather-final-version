import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'

class Login extends Component {

    // defining component state
    state = {
        userId : null,
        authedUser: false
    }

    // reacting to an user event
    handleChange = (event) => {
        let userId = event.target.value

        this.setState({
            userId: userId
        })
    }

    // handling Log in event when clicked
    handleLogin = (event) => {
        event.preventDefault()

        // getting dipatch from our store
        const {dispatch} = this.props

        dispatch(setAuthedUser(this.state.userId))

        this.setState({
            authedUser: true
        })
    }
    
    render() {

        // redirect goes here
        console.log(this.props)
        
        return (
            <div>
                <h3 className='center'>Welcome to the Would you rather app!</h3>
                <h4 style={{marginTop: 200}}>Please Login with your user</h4>
                <select className="select-user" onChange={this.handleChange}>
                    <option value=''>--Please select user--</option>
                        {this.props.users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                </select>
                <button className="log-in" onClick={this.handleLogin}>Log in</button>
            </div>
        )
    }

}

function mapStateToProps ({users}) {
    return {
        users : Object.keys(users).map(key => users[key])
    }
}

export default connect(mapStateToProps)(Login)