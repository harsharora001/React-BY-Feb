import { Dispatch, AnyAction } from "redux";
import Axios from "axios";
import { ThunkAction } from "redux-thunk";
import { Customer } from "../model/Customer";

export const createINCAction = () => {
    return {
        type: "INC_CTR"
    }
};
export const createDECRAction = () => {
    return {
        type: "DECR_CTR"
    }
};
export const fetch = () => {

    return (dispatch: Dispatch) => {

        const url = "https://calm-beach-18228.herokuapp.com/customers";
        Axios.get(url)
            .then((resp) => {
                dispatch({
                    type: "FETCH_CUST",
                    payload: resp.data
                });
            })
        
      
    }
}
