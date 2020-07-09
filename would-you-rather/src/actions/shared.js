import {getInitialData} from '../utils/api'
import {receiveUsers} from './users'
import {receiveQuestions} from './questions'
import {setAuthedUser} from '../actions/authedUser'

// temporaly using tylermcginnis as authedUser
//const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
                //dispatch(setAuthedUser(AUTHED_ID))
            })
    }
}
