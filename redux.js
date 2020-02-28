//import {createStore} from 'redux';

// for node.js
const redux = require('redux');
const createStore = redux.createStore;

//initial State
const initState = {
    count: 5,
    msg: "Hello Redux"
};
//reducer
const reducer = (currentState=initState, action) => {

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
    if(action.type === "INC_CTR_BY"){
        return {
            ...currentState,
            count : currentState.count + action.value
        }
    }

    return currentState;
}
//store
const store = createStore(reducer);
console.log("state: ", store.getState());

//subscribe
store.subscribe(() => {
    console.log("subscribe: ", store.getState());
})



//dispatch action
store.dispatch({ type: "INC_CTR"});
//console.log("state: ", store.getState());
store.dispatch({ type: "DECR_CTR"});
//console.log("state: ", store.getState());
store.dispatch({ type: "INC_CTR_BY", value: 10});
//console.log("state: ", store.getState());



