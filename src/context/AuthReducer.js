import { useEffect } from "react";

export const initialState = {
    user: JSON.parse(window.localStorage.getItem('user_auth')) || null
};

const AuthReducer = (state, action) => {

    const { type, payload } = action;

    // 

    switch (type) {
        case "LOGIN":
            return {
                user: payload
            };
        case "LOGOUT":
            return {
                user: null,
            };
        default:
            return state;
    }

};

export default AuthReducer;