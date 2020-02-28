import React, { Component, MouseEvent, PureComponent } from 'react';
import { Customer } from '../model/Customer';
import './ListCustomers.css'
import CustomerForm from './CustomerForm';
import Axios from 'axios';
import withBorder from './withBorder';


interface IListCustomersProps {

}
export interface IListCustomersState {
    data: Array<Customer>;
    addMode: boolean,
    selectedCustomer: Customer | undefined
}

export class ListCustomers extends PureComponent<IListCustomersProps, IListCustomersState>  {

    state = {
        data: new Array<Customer>(),
        addMode: false,
        selectedCustomer: new Customer(-1, "", "")
    }
    url: string;

    constructor(props: IListCustomersProps) {
        super(props);
        console.log("[ListCustomers construtor]", props);
        this.url = "https://calm-beach-18228.herokuapp.com/customers";

        // this.state.data.push(new Customer(1, "Facebook", "Hyderabad"));
        // this.state.data.push(new Customer(2, "Google", "Hyderabad"));
        // this.state.data.push(new Customer(3, "Reliance", "Mumbai"));
        // this.state.data.push(new Customer(4, "Microsoft", "Bangalore"));
    }

    componentWillMount() {
        console.log("[ListCustomers WillMount]");
    }
    async componentDidMount() {
        console.log("[ListCustomers DidMount]");

        try {

            const response = await Axios.get(this.url);
            const customers = response.data.map((item: any) => {
                return new Customer(item.id, item.name, item.location);
            });
            this.setState({
                data: customers
            });
        } catch (e) {
            console.log("error: ", e);
        }



    }
    componentWillReceiveProps() {
        console.log("[ListCustomers WillReceiveProps]");
    }
    // shouldComponentUpdate(){
    //     console.log("[ListCustomers shouldUpdate]");
    //     return true;
    // }
    componentWillUpdate() {
        console.log("[ListCustomers WillUpdate]");
    }
    componentDidUpdate() {
        console.log("[ListCustomers DidUpdate]");
    }
    componentWillUnmount() {
        console.log("[ListCustomers willUnmount]");
    }



    add = async (customer: Customer) => {

        try {

            await Axios.post(this.url, customer);
            alert("Saved");
            //copy
            const data = [...this.state.data];
            data.push(customer);
            this.setState({ data });

        } catch (error) {
            alert("Failed to save..")
        }
    }
    update = (customer: Customer): void => {

        const data = [...this.state.data];
        const index = data.findIndex(item => item.id === customer.id);
        data[index] = customer;
        this.setState({ data, selectedCustomer: new Customer(-1) });
    }
    closeEditForm = () => {
        this.setState({
            selectedCustomer: new Customer(-1)
        })
    }

    delete = (index: number) => {

        //copy
        const updatedCustomers = [...this.state.data];
        updatedCustomers.splice(index, 1);
        this.setState({
            data: updatedCustomers
        });

    }

    addNew = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        this.setState({
            addMode: true
        });
    }

    closeAddForm = () => {
        this.setState({
            addMode: false
        });
    }
    edit = (customer: Customer) => {

        this.setState({
            selectedCustomer: customer
        });

    }

    renderCustomers() {

        return this.state.data.map((item, index) => {
            return (
                <div key={item.id} className="customer">
                    <p>Id: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <p>Location: {item.location}</p>
                    <div>
                        {/* <button onClick={() => {this.delete(index)}}>Delete</button> */}
                        <button className="delete" onClick={this.delete.bind(this, index)}>Delete</button>
                        &nbsp;
                        <button onClick={() => { this.edit(item) }}>Edit</button>
                    </div>
                </div>
            );
        })

    }



    render() {
        console.log("[ListCustomers render]");
        return (
            <div>
                <h2>Customers</h2>

                <div>
                    <a href="#" onClick={this.addNew}>Add New</a>
                </div>

                {/* html ==>  style="width: 100px" */}
                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                    {this.renderCustomers()}
                </div>

                {this.state.addMode ?
                    <CustomerForm onSave={this.add} onCancel={this.closeAddForm} /> : null}

                {this.state.selectedCustomer.id !== -1 ?
                    <CustomerForm
                        key={this.state.selectedCustomer.id}
                        customer={this.state.selectedCustomer}
                        onSave={this.update}
                        onCancel={this.closeEditForm} /> : null}

            </div>
        );
    }

}

export default withBorder(ListCustomers);