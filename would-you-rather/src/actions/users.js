import {saveQuestionAnswer} from '../utils/api'
import {addAnswerToQuestion} from '../actions/questions'

// export action type
export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

// adding new users actions
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'

export function addAnswerToUser(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    }
}

// adding new users actions
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'

export function addQuestionToUser({id, author}) {
    return {
        type: ADD_QUESTION_TO_USER,
        id,
        author
    }
}

// middleware thunk method
export function handleSaveQuestionAnswer(authedUser, qid, answer) {
    return dispatch => {
        dispatch(addAnswerToUser(authedUser, qid, answer))
        dispatch(addAnswerToQuestion(authedUser, qid, answer))

        return saveQuestionAnswer(authedUser, qid, answer)
            .catch(event => {
                console.warn('There was an error:', event)
            })
    }
}