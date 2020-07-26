import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

class Signup extends Component {

    //defining my state component
    state = {
        username : '',
        avatarURL : '',
        fullName : '',
        signed : false
    }

    // handling events
    handleOnChange = (event) => {
        event.preventDefault()

        this.setState({
            fullName : event.target.value
        })
    }

    handleAvatar = (event) => {
        event.preventDefault()

        this.setState({
            avatarURL : event.target.value
        })
    }

    handleUserName = (event) => {
        event.preventDefault()

        this.setState({
            username : event.target.value
        })
    }

    render() {

        if(this.state.signed === true) {
            return <Redirect to="/Login"/>
        }

        return (
            <div>
                <h3>Sign-up</h3>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Enter your name" value={this.state.fullName} onChange={this.handleOnChange}/>
                    <input type="text" placeholder="Enter your username" value={this.state.username} onChange={this.handleUserName}/>
                    <input type="text" placeholder="Enter Avatar URL" value={this.state.avatarURL} onChange={this.handleAvatar}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

}

export default connect()(Signup)