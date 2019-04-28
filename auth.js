import { getToken } from './busnisses/Validation';
import { AsyncStorage } from 'react-native';

export const Token = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});



export const getUserToken = () =>{
    const Token = AsyncStorage.getItem('userToken')
    return Token
}

export const saveUserToken = () =>
    AsyncStorage.setItem('userToken', getToken(25))

export const removeUserToken = () =>
    AsyncStorage.removeItem('userToken')
