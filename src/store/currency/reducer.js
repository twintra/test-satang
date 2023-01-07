import {
    GET_CURRENCY,
    GET_CURRENCY_SUCCESS,
    GET_CURRENCY_FAIL,
} from "./actionTypes";

const initialState = {
    values: [],
    loading: false,
    error: {
        message: "",
    }
}

const CurrencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENCY:
            state = { ...state, loading: true }
            break;
        case GET_CURRENCY_SUCCESS:
            state = { ...state, values: action.payload, loading: false }
            break;
        case GET_CURRENCY_FAIL:
            state = {
                ...state,
                error: {
                    message: "Error"
                },
                loading: false
            }
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default CurrencyReducer;