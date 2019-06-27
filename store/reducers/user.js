import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/actionTypes'

const inititalState = {
    token: null,
    id: null,
    username: null
}

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                token: action.payload.token,
                id: action.payload.id,
                username: action.payload.username
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                token: null,
                id: null,
                username: null
            }
        default:
            return state
    }
}

export default reducer