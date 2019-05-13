import { getToken } from './busnisses/Validation';
import AsyncStorage from '@react-native-community/async-storage';

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


export const removeUserToken = () =>
    AsyncStorage.removeItem('userToken')


export const saveUser = (User, Token) => {
    try {
        AsyncStorage.multiSet([
            ['user', JSON.stringify(User)],
            ['tkn', Token]
        ])
        return true
    } catch(err){
        return err
    }

}

export const saveClient = (Client, Token) => {
    try {
        AsyncStorage.multiSet([
            ['client', JSON.stringify(Client)],
            ['tkn', Token]
        ])
        return true
    } catch(err){
        return err
    }
}

export const saveMechanic = (Mechanic, Token) => {
    try {
        AsyncStorage.multiSet([
            ['mechanic', JSON.stringify(Mechanic)],
            ['tkn', Token]
        ])
        return true
    } catch(err){
        return err
    }

}