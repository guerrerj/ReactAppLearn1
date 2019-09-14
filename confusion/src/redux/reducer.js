import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';

// Where the state is setup 

export const initialState = {
    dishes: DISHES, // doesnt receive any props but has the dishes 
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

// Can only do an immutable change and return the updated change
// Store needs to know what to do when action is dispatched 
export const Reducer = (state = initialState, action) => {
    return state; 
};