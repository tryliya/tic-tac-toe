import { ACTION_TYPES} from "./constants";

const initialState = {
    email: '',
    password: '',
    user: {},
    board: Array(9).fill(null),
    xIsNext: true
}

const reducer = (state = initialState, action) => {
    
    if (action.type === ACTION_TYPES.CHANGE_EMAIL) {
        return {
        ...state,
        email: action.payload
        }
    }
    if (action.type === ACTION_TYPES.CHANGE_PASSWORD) {
        return {
        ...state,
        password: action.payload
        }
    }
    if (action.type === ACTION_TYPES.LOGIN_START) {
        return {
        ...state
        }
    }
    if (action.type === ACTION_TYPES.LOGIN_SUCCESS) {
        return {
        ...state,
        user: action.payload
        }
    }
    if (action.type === ACTION_TYPES.LOGIN_FAILURE) {
        return {
        ...state
        }
    }
    if (action.type === ACTION_TYPES.CHANGE_BOARD) {
        return {
        ...state,
        board: action.payload
        }
    }
    if (action.type === ACTION_TYPES.CHANGE_X_IS_NEXT) {
        return {
        ...state,
        xIsNext: action.payload
        }
    }
    if (action.type === ACTION_TYPES.CHANGE_GAME_TYPE) {
        console.log(action);
        console.log(state);
        return  {
            ...state,
            xIsNext: initialState.xIsNext,
            board: initialState.board
            }
    }

    
    
    return state;
}

export default reducer;