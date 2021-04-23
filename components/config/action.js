export const setUserAuth = (props) => {
    return (dispatch) => {
        dispatch({ type: 'SET_AUTH', payload: props })
    }
}

export const setMembership = (props) => {
    return (dispatch) => {
        dispatch({ type: 'SET_MEMBERSHIP', payload: props })
    }
}
