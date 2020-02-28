import React, {Component, ChangeEvent} from 'react';
import { Customer } from '../model/Customer';
import {withRouter, RouteComponentProps} from 'react-router-dom';

interface ICustomerFormProps extends RouteComponentProps{
    onSave: (customer: Customer) => void
    onCancel: () => void,
    customer?: Customer | null
}
interface ICustomerFormState{
    customer: Customer
}

class CustomerForm extends Component<ICustomerFormProps, ICustomerFormState> {

    state = {
        customer: new Customer(0, "", "")
    }
    initState: ICustomerFormState | null = null;

    constructor(props: ICustomerFormProps){
        super(props);
        console.log("CustomerFOrm", props)
        this.initState = {...this.state};
        if(this.props.customer){
            this.state.customer = this.props.customer;
        }

    }
    change = (evt: ChangeEvent<HTMLInputElement>, propName: string) => {

        const value = evt.target.value;
        const updatedCutomer = {...this.state.customer};
        if(propName === "id"){
            updatedCutomer[propName] = parseInt(value);
        }
        else{
            if(propName === "name" || propName === "location"){
                updatedCutomer[propName] = value;
            }
            //
        }
        
        this.setState({
            customer: updatedCutomer
        });
    }
    save = () => {

        this.props.onSave(this.state.customer);
        this.setState(this.initState);
        
    }
    // static getDerivedStateFromProps(nextProps: ICustomerFormProps, 
    //                                     currentState: ICustomerFormState){

    //      if(nextProps.customer && nextProps.customer.id !== currentState.customer.id){
    //         //return new State
    //         return {
    //             ...currentState,
    //             customer: nextProps.customer
    //         };
    //      }
    //      return null;
    // }
     render(){
         return (
             <div>
                 <fieldset>
                     <p>ID</p>
                     <div>
                         <input type="number" 
                            value={this.state.customer.id}
                            onChange={(evt) => {this.change(evt, "id")}}/>
                     </div>

                     <p>Name</p>
                     <div>
                         <input value={this.state.customer.name}
                            onChange={(evt) => {this.change(evt, "name")}}/>
                     </div>

                     <p>Location</p>
                     <div>
                         <input value={this.state.customer.location}
                                    onChange={(evt) => {this.change(evt, "location")}}/>
                     </div>
                     <div>
                         <button className="save"
                            onClick={this.save}>Save</button> &nbsp;
                         <button onClick={() => this.props.onCancel()}>Cancel</button>
                     </div>
                 </fieldset>
             </div>
         );
     }

}

export default withRouter(CustomerForm);