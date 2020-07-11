import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// if I want the css by default I can import App.css
import '../App.css'
import Home from './Home'
import Nav from './Nav'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {

    const {authedUser} = this.props

    return (
      <Router>
        <div className="App">
          <Nav />
          {authedUser === null ? (
            <Route
              render = {() => (
                <Login />
              )}
            />
          ) : (
            <Fragment>
              <Route exact path="/" component={Home}/>
            </Fragment>
          )
          }
        </div>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    //loading: authedUser === null
    authedUser
  }
}

export default connect(mapStateToProps)(App);
