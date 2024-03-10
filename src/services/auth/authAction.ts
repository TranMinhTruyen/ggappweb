import { setAuth } from 'services/auth/authSlice';
import store from 'app/store';

const getTokenState = () => {
    try {
        let persistedState = localStorage.getItem('auth');
        if (persistedState) {
            return JSON.parse(persistedState);
        }
        persistedState = sessionStorage.getItem('auth');
        if (persistedState) {
            return JSON.parse(persistedState);
        }
    } catch (e) {
        throw new Error(e);
    }
};

export const getAuth = () => {
    const tokenState = getTokenState();
    if (tokenState) {
        store.dispatch(setAuth(tokenState));
    }
};
