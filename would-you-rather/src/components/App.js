import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// if I want the css by default I can import App.css
import '../App.css'
import Home from './Home'
import Nav from './Nav'
import PollQuestion from './PollQuestion';
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard';
import ErrorPage from './ErrorPage'


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {


    return (
      <Router>
        <Fragment>
          <LoadingBar style={{backgroundColor: 'red'}}/>
          <div className="App">
            <Nav />
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/Login" exact component={Login}/>
                <Route path="/questions/:question_id" exact component={PollQuestion}/>
                <Route path="/questions/bad_id" component={ErrorPage}/>
                <Route path="/new" exact component={NewPoll}/>
                <Route path="/leaderboard" exact component={Leaderboard}/>
                <Route component={ErrorPage}/>
              </Switch>
          </div>
        </Fragment>
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
