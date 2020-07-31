import {saveQuestion} from '../utils/api'
//import {addQuestionToUser} from '../actions/users'

// export action type
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

// adding new questions actions
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION'

export function addAnswerToQuestion(authedUser, qid, answer) {
    return {
        type: ADD_ANSWER_TO_QUESTION,
        authedUser,
        qid,
        answer
    }
}

// adding new questions actions
export const ADD_QUESTION = 'ADD_QUESTION'

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

// middleware thunk method
export function handleSaveQuestion(optionOneText, optionTwoText, author) {
    return dispatch => {
        return saveQuestion({optionOneText, optionTwoText, author})
            .then(question => {
                dispatch(addQuestion(question))
                //dispatch(addQuestionToUser(question))
            })
    }
}