import {DISHES} from '../shared/dishes';
import * as ActionTypes from './ActionTypes';

// Reducer for dishes
export const Dishes=(state={
    isLoading: true,  // default value of state
    errMess:null, // names should be same as in action creators for self populating on action types
    dishes: []
    },action)=>{
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading:false , errMess: null , dishes : action.payload}
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading:true , errMess: null , dishes : []}  // new object is returned previous object remains immutable
            // ... is a spread operator, it will take existing state and whatever is passed next acts as the modification to the state
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading:true , errMess: action.payload , dishes : []}
        default:
            return state;
    }
}