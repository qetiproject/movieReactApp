const weatherReducer = (state = initialSstate, action) => {
    switch(action.type) {
        case "SUCCESS":
            return state + action.data
        case "FAIL":
            return {}
        default:
            return state
    }
}

const initialSstate = {}
export default weatherReducer