import { all, fork } from 'redux-saga/effects';

import CurrencySaga from './currency/saga';

export default function* rootSaga() {
    yield all([fork(CurrencySaga)])
}
