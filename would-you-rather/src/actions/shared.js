import {getInitialData} from '../utils/api'
import {receiveUsers} from './users'
import {receiveQuestions} from './questions'
//import {setAuthedUser} from '../actions/authedUser'
import {showLoading, hideLoading} from 'react-redux-loading'
//import {addAnswerToUser} from './users'
//import {addAnswerToQuestion} from './questions'
//import {saveQuestionAnswer} from '../utils/api'

// temporaly using tylermcginnis as authedUser
//const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
                //dispatch(setAuthedUser(null))
                dispatch(hideLoading())
            })
    }
}
