import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "../constants";


const initialState = {
    token: localStorage.getItem("token"),
    authority: localStorage.getItem("authority"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                authority: action.payload.authority,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state;
    }
}