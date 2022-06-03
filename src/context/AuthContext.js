import { createContext, useContext, useEffect, useReducer } from 'react';
import AuthReducer, { initialState } from './AuthReducer';

const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        if (state.user === null) {
            window.localStorage.setItem("user_auth", "");
        } else {
            window.localStorage.setItem('user_auth', JSON.stringify(state.user));
        }

    }, [state.user]);

    const login = (user) => {

        dispatch({
            type: 'LOGIN',
            payload: user
        });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const values = {
        user: state.user,
        login,
        logout
    };
    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider >;
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context == undefined) {
        throw new Error("context must be use inside Authcontext");
    }

    return context;
};

export default useAuth;