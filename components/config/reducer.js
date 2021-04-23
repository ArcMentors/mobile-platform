const initialState = {
    isAuth: false,
    membership: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH': {
            return { ...state, isAuth: action.payload }
        }
        case 'SET_MEMBERSHIP': {
            return { ...state, membership: action.payload }
        }
        default:
            return state
    }
}
