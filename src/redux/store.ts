import {createStore, Action, applyMiddleware, compose} from 'redux';
import { Customer } from '../model/Customer';
import ReduxThunk from 'redux-thunk'


export interface AppState{
    count: number,
    msg: string,
    customers: Array<Customer>
}

//initial State
const initState: AppState = {
    count: 5,
    msg: "Hello Redux",
    customers: []
};

interface AppAction extends Action{

    value? : number,
    payload? : any
}

//reducer
const reducer = (currentState: AppState=initState, action: AppAction) => {

    //return new/updated state
    if(action.type === "INC_CTR"){
        return {
            ...currentState,
            count : currentState.count + 1
        }
    }
    if(action.type === "DECR_CTR"){
        return {
            ...currentState,
            count : currentState.count - 1
        }
    }
    if(action.type === "INC_CTR_BY" && action.value){
        return {
            ...currentState,
            count : currentState.count + action.value
        }
    }
    if(action.type=== "FETCH_CUST" && action.payload){
        return {
            ...currentState,
            customers: action.payload
        }
    }

    return currentState;
}

//store
// export const store = createStore(reducer, 
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

//export const store = createStore(reducer, applyMiddleware(ReduxThunk));

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(ReduxThunk)))
