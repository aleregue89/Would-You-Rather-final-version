// What we do here is combine the reducers into one main root reducer which will combine the following into a single state object.

import {combineReducers} from 'react-redux'
import {users} from './users'
import {questions} from './questions'
import {authedUSer} from './authedUser'

export default combineReducers({users, questions, authedUSer})