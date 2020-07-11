import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {authedUser, setAuthedUser} from '../actions/authedUser'


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
        let image = <img style={{borderRadius: '100%', height: 30, width: 30, marginLeft: 15}} 
                        alt="user-avatar"
                        src= {user.avatarURL}/>

        let name = user.name

        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact style={{textDecoration: 'none',width: '100', color: 'orange'}}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new' style={{textDecoration: 'none',width: '100', color: 'orange'}}>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' style={{textDecoration: 'none',width: '100', color: 'orange'}}>
                            Leaderboard
                        </NavLink>
                    </li>
                </ul>
                <div className="nav-msg" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {image}
                    <p>{name}</p>
                </div>
                <button className="log-out" onClick={this.handleLogout}>Logout</button>
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