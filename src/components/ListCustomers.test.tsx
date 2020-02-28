import React from 'react';
import { IListCustomersState, ListCustomers} from './ListCustomers';
import {mount, configure, shallow, ReactWrapper} from 'enzyme';
import Adapater from 'enzyme-adapter-react-16';
import axios from 'axios';
configure({adapter: new Adapater()});


jest.mock('axios', () => {

    const data = [
        {id: 1, name: "Abc", location: "loc"},
        {id: 2, name: "Abc", location: "loc"},
        {id: 3, name: "Abc", location: "loc"},
        {id: 4, name: "Abc", location: "loc"},
    ]


    return {
        get: () => Promise.resolve({data: data})
    }


});


let component : ReactWrapper;
beforeEach(() => {
    component = mount(<ListCustomers/>);
    
})

test("should call componentDidMount", () => {

    const componentDidMountSpy =  spyOn(ListCustomers.prototype, "componentDidMount");
    const component = mount(<ListCustomers/>);
    expect(componentDidMountSpy).toBeCalledTimes(1);

})

it("should have state.data with 4 items", (done) => {

    const component = mount(<ListCustomers/>);

    const instance = component.instance() as ListCustomers;

        instance.componentDidMount().then(function (){

            const state = component.state() as IListCustomersState;
            expect(state.data).toBeTruthy();
            expect(state.data.length).toBe(4);
            done();

        })

    

})


//
//  <div class="customer">
//    <p> Id: 
//    <p> Name:  
//    <p> Location  
//  </div>
test("should render the data", (done) => {

    const component = mount(<ListCustomers/>);
    const instance = component.instance() as ListCustomers;
    instance.componentDidMount().then(function (){

        component.update();
        const elements=  component.find(".customer").first().find("p");
        expect(elements.length).toBe(3);
        expect(component.find(".customer").length).toBe(4);
        done();

    })
})
test.skip("should delete a customer on calling delete()", () => {

    //const component = shallow(<ListCustomers/>);
    const instance  =  component.instance() as ListCustomers;
    instance.delete(1);

    const state = component.state() as IListCustomersState;
    expect(state.data.length).toBe(3);

})
test.skip("should delete a customer on clicking the delete btn", () => {

    const btn = component.find(".delete").first();
    btn.simulate('click');
    
    const elements = component.find(".customer");
    expect(elements.length).toBe(3);
    
})



