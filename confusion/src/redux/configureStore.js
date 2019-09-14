import {createStore} from 'redux';
import {Reducer, initialState} from './reducer'; 
import { create } from 'domain';

// This creates a store 
export const ConfigureStore = () => {
    const store = createStore(
        Reducer, 
        initialState
    );
    return store; 
};