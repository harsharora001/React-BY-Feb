import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../redux/store';
import { Dispatch, AnyAction } from 'redux';

//import {createDECRAction, createINCAction} from '../redux/actionCreators';
import * as actionCreators from '../redux/actionCreators';
import { Customer } from '../model/Customer';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';


interface IReduxCounterProps{
    ctr: number,
    customers: Array<Customer>,
    inc: () => void,
    decr: () => void,
    fetch: () => void
}

class ReduxCounter extends Component<IReduxCounterProps> {

    componentDidMount(){
        this.props.fetch();
    }

     render(){
         return (
             <div>
                 <h2>Redux Counter</h2>
                 <h4>Count : {this.props.ctr}</h4>
                 <div>
                     <button onClick={this.props.inc}>Increment</button> &nbsp;
                     <button onClick={this.props.decr}>Decrement</button>
                 </div>
                 <div>
                     {this.props.customers.map((item) => (
                         <div>
                             <p>Id: {item.id}</p>
                             <p>Name: {item.name}</p>
                         </div>

                     ))}
                 </div>
             </div>
         );
     }
}

//  <ReduxCounter ctr={5} inc={} decr={}/>
const mapStateToProps = (reduxState : AppState) => {

    return {
        ctr: reduxState.count,
        customers: reduxState.customers
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => {

    return {
        // inc : () => {dispatch({type: "INC_CTR"})},
        // decr: () => {dispatch({type: "DECR_CTR"})}
        inc : () => {dispatch(actionCreators.createINCAction())},
        decr: () => {dispatch(actionCreators.createDECRAction())},
        fetch: () => {dispatch(actionCreators.fetch())}

    }
}

//  const hoc = connect(mapStateToProps, mapDispatchToProps);
//  const component = hoc(ReduxCounter);

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter);