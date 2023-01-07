import { get } from './api_helper';
import * as url from './url_helper';

export const getCurrency = (currency) => {
    const params = {symbol: currency}
    return get(url.GET_TICKER, params)
} 