import thunk from 'redux-thunk'
import logger from './logger'
import {applyMiddleware} from 'redux'

// One thing to note is that middleware gets run after the action creator returns an object or function but before getting sent to the reducer.
export default applyMiddleware(
    thunk,
    logger
)