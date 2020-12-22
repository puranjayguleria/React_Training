import {COMMENTS} from '../shared/comments';
import * as ActionTypes from './ActionTypes';
//reducer for comments
export const Comments=(state=COMMENTS,action)=>{
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length; // state is comments see the parameters of this method as comment id not provided yet 
            comment.date = new Date().toISOString();
            return state.concat(comment); // immutable object on state so that prev state is not affected
        default:
            return state;
    }
}