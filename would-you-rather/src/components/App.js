import React, {Component} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Login from './Login'
import Register from './Register'
// if I want the css by default I can import App.css

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="App">
        {this.props.loading === true 
          ? null
          : <Login />}
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect()(App);
