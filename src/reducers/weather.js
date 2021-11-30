const weatherReducer = (state = '', action) => {
    switch(action.type) {
        case "SUCCESS":
            return state + action.data
        case "FAIL":
            return {}
        default:
            return state
    }
}

export default weatherReducer