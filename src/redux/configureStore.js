import {createStore,combineReducers,applyMiddleware} from 'redux' // allows us to create the redux store
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {createForms} from 'react-redux-form'
import { InitialFeedback } from './forms';
export const ConfigureStore = ()=> {
    const store= createStore(
        combineReducers({
            // Combining all reducers present
            dishes:Dishes,
            comments:Comments,
            promotions:Promotions,
            leaders:Leaders,
            ...createForms({
                feedback:InitialFeedback // reset the form to its initial state 
            })
        }),
        applyMiddleware(thunk,logger) // enhances for store 
    );
    return store;
}