import React, {Component} from 'react'
import {connect} from 'react-redux'

class Register extends Component {

    // defining state for component
    state = {
        username: '',
        name: '',
        avatarURL: '',
        registrationCompleted: false
    }

    render() {

        // redirect goes here 

        return (
            <div className="registration-form">
                <h3>Register</h3>
                <form className="form">
                    <input type='text' 
                            placeholder='enter your Username'
                            value={this.state.username}>
                    </input>
                    <input type='text'
                            placeholder='enter your full Name'
                            value={this.state.name}>
                    </input>
                    <input type='text'
                            placeholder='enter Avatar URL'
                            value={this.state.avatarURL}>
                    </input>
                    <button type='submit'>Submit registration</button>
                </form>
            </div>
        )
    }
}

export default connect()(Register)