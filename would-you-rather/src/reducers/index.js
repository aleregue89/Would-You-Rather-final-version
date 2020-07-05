// What we do here is combine the reducers into one main root reducer which will combine the following into a single state object.

import {combineReducers} from 'redux'
import {users} from './users'
import {questions} from './questions'
import {authedUser} from './authedUser'

export default combineReducers({users, questions, authedUser})