import { takeLatest, put, call } from "redux-saga/effects"
import { GET_CURRENCY } from './actionTypes'

import { getCurrencySuccess, getCurrencyFail } from './actions'
import { getCurrency } from "../../helpers/backend_helper";

function* onGetCurrency ({payload: currency}) {
    try{
        const response = yield call(getCurrency, currency);
        yield put(getCurrencySuccess(response))
    }catch(error) {
        yield put(getCurrencyFail(`error => ${error}`))
    }
}

function* CurrencySaga() {
    yield takeLatest(GET_CURRENCY, onGetCurrency);
}

export default CurrencySaga;