import * as ActionTypes from './ActionTypes';
import {DISHES} from '../shared/dishes'
export const addComment = (dishId , rating, author, comment)=>({
    type: ActionTypes.ADD_COMMENT, // Type of action is always mentioned
    payload : {
        dishId:dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});
// using thunk as written in notes the inner function of thunk gets access to dispatch and state
export const fetchDishes= () => (dispatch) => { //We want two reducers to work according to our needs so thunk 
    dispatch(dishesLoading(true)); // dispatch dishes Loading 
    
    setTimeout(() => {  
        dispatch(addDishes(DISHES)); // after a time out of 2 sec call dispatch for addDishes
    },2000);
}

export const dishesLoading = () => ({ // method to tell someone that dishes are loading
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({ 
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});