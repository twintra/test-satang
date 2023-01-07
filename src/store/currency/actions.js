import {
    GET_CURRENCY,
    GET_CURRENCY_SUCCESS,
    GET_CURRENCY_FAIL,
} from "./actionTypes";

export const getCurrency = (currency) => {
    return {
        type: GET_CURRENCY,
        payload: currency,
    };
};

export const getCurrencySuccess = (value) => {
    return {
        type: GET_CURRENCY_SUCCESS,
        payload: value,
    };
};

export const getCurrencyFail = (error) => {
    return {
        type: GET_CURRENCY_FAIL,
        payload: error,
    };
};
