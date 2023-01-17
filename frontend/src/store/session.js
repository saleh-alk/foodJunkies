import jwtFetch from './jwt'


const RECEIVE_CURRENT_USER = 'session/RECEIVE_CURRENT_USER'
const RECEIVE_SESSION_ERRORS = 'session/RECEIVE_SESSION_ERRORS'
const CLEAR_SESSION_ERRORS = 'session/CLEAR_SESSION_ERRORS'
export const RECEIVE_USER_LOGOUT = 'session/RECEIVE_USER_LOGOUT'


//dispatch receiveCurrentUser when a user logs in
const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
})


//DISPATCH receiveCurrentErrors to show errors in frontend
const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})


const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
})

//Dispatch clear session errors
export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})


const startSession = (userInfo, route) => async (dispatch) => {
    
    try {
        
        const res = await jwtFetch(route, {
            method: "POST",
            body: JSON.stringify(userInfo)
        })
        console.log(res)
        const { user, token } = await res.json();
        
        localStorage.setItem('jwtToken', token);
        return dispatch(receiveCurrentUser(user))
    } catch (err) {
        console.log(err)
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors))
        }
    }
}

export const getCurrentUser = () => async dispatch => {
    const res = await jwtFetch('/api/users/current')

    if(res.ok){
        const data = await res.json()
        dispatch(receiveCurrentUser(data))
    }
}
export const signup = user => startSession(user, 'api/users/register')
export const login = user => startSession(user, 'api/users/login')


export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser())

}

const initialState = {
    user: null
}

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
        
            if(action.currentUser){
                return { user: action.currentUser }
            } else {
                return state
            }
            break;
        case RECEIVE_USER_LOGOUT:
            return initialState
            break;

        default:
            return state
            break;
    }
}

export default sessionReducer;

const nullErrors = null;

export const sessionErrorReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors
            break;
        case RECEIVE_CURRENT_USER:
            break;
        case CLEAR_SESSION_ERRORS:
            return nullErrors
            break;
        default:
            return state;
            break;
    }
}