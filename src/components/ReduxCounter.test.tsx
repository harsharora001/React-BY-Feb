import React from 'react';
import ReduxCounter from './ReduxCounter';
import {mount, shallow, ReactWrapper} from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const initState = {
    count: 2,
    customers: []
}
const store = mockStore(initState);
//store.replaceReducer()


describe("Redux", () => {


    it("counter", () => {
        const component = shallow(<ReduxCounter store={store}/>);
        expect(component).toBeTruthy();
        console.log(component.childAt(0).debug());
        const props = component.childAt(0).dive().instance().props as any;
        expect(props.ctr).toBe(2);

        const storeSpy = spyOn(store, "dispatch");

        store.dispatch({type: "INC_CTR"});
        expect(storeSpy).toBeCalledTimes(1);



    })

})



