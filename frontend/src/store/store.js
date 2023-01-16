import { createStore, combineReducers, applyMiddleWare, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import errors from './errors'


const rootReducer = combineReducers({
    session,
    errors
})

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleWare(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    enhancer = composeEnhancers(applyMiddleWare(thunk, logger))
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;