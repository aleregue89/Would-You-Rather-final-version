import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'



class Nav extends Component {

     // handling logout
     handleLogout = (event) => {
        event.preventDefault()

        // getting dispatch from the store
        const {dispatch} = this.props

        dispatch((setAuthedUser(null)))

    }

    render() {
        const {user} = this.props

        // handling avatar 
        let image = ''
        let name = user.name
        let welcomeMSG = ''

        // conditional for handling nav (name and avatar)
        if (user) {
            welcomeMSG = 'Welcome, ' + name
            image = <img style={{borderRadius: '100%', height: 30, width: 30, marginLeft: 15}} 
                        alt="user-avatar"
                        src= {user.avatarURL}/>
        } else {
            image = ''
            welcomeMSG = ''
        }

        return (
            <nav className="nav">
                <ul>
                    <li>
                        <NavLink to='/' exact style={{textDecoration: 'none',width: '100', color: 'black'}}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new' style={{textDecoration: 'none',width: '100', color: 'black'}}>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' style={{textDecoration: 'none',width: '100', color: 'black'}}>
                            Leaderboard
                        </NavLink>
                    </li>
                </ul>
                <div className="nav-msg" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {image}
                    <p>{welcomeMSG}</p>
                </div>
                { user ? <button className="log-out" icon="log out" size="mini" onClick={this.handleLogout}>Logout</button>
                    : ( <NavLink to="/Signup" exact style={{textDecoration: 'none', color: 'lightseagreen'}}>
                        Sign-Up
                        </NavLink>

                )}
            </nav>
        )
    }
    
}

function mapStateToProps({users, authedUser}) {

    let user = users[authedUser]

    return {
        user : user ? user : ''
    }
}

export default connect(mapStateToProps)(Nav)