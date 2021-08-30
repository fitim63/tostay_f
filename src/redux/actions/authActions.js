import {LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADING} from "../constants";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const registerUser = (user) => async (dispatch) => {
    axios({
        method: "POST",
        url: "http://localhost:8080/createUser",
        data: {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password,
        }
    }).then((user) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                user: user
            }
        })
    }).catch((err) => {
        dispatch({
            type: REGISTER_FAIL,
        });
    });
};

export const registerHost = (user) => async (dispatch) => {
    axios({
        method: "POST",
        url: "http://localhost:8080/createHost",
        data: {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password,
        }
    }).then((user) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                user: user
            }
        })
    }).catch((err) => {
        dispatch({
            type: REGISTER_FAIL,
        });
    });
};

export const login = (user) => async (dispatch) => {
    dispatch({type: USER_LOADING});
    localStorage.setItem("username", user.username);
    axios({
        method: "POST",
        url: "http://localhost:8080/login",
        data: {
            username: user.username,
            password: user.password,
        },
    })
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            console.log('authAction token: ', response.data.token);
            const token = response.data.token;
            const user1 = jwtDecode(token);
            console.log(user1);
            const authorities = user1.authorities;
            console.log(authorities);
            const authority = authorities[0].authority;
            localStorage.setItem("authority", authority);
            console.log("authority: ", authority);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: response.data.token,
                    authority: authority,
                    isAuthenticated: true,
                    isLoading: false,
                    user: user,
                },
            });
        })
        .catch((error) => {
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};