import React, {Component} from 'react'

class ErrorPage extends Component{
    render() {
        return (
            <div style={{textAlign: 'center'}}>
            <h1> Error 404, sorry we couldn't find any match</h1>
            <p>Please use the navigation bar to go back</p>
        </div>
        )
    }
} 

export default ErrorPage