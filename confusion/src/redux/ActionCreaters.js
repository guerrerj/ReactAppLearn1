import {DISHES} from '../shared/dishes';
import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl'; 


export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId, 
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchComments = () => (dispatch) => {
    dispatch(dishesLoading(true)); 

    return fetch(baseUrl + 'comments')// Give location of information
        .then(response=>response.json())
        .then(comments=>dispatch(addComments(comments)));
    } 
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true)); 

    return fetch(baseUrl + 'dishes')// Give location of information
        .then(response=>response.json())
        .then(dishes=>dispatch(addDishes(dishes)));
    } 


export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) =>({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess 
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes 
});

export const commentsFailed = (errmess) =>({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess 
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments 
});

export const fetchPromotions = () => (dispatch) => {
    dispatch(promotionsLoading(true)); 

    return fetch(baseUrl + 'promotions')// Give location of information
        .then(response=>response.json())
        .then(promos=>dispatch(addPromotions(promos)));
    } 

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = (errmess) =>({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errmess 
});

export const addPromotions = (promos) => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promos
});
