import axios from "axios";

/**
 * get ratio of listed currency
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getRatio() {
    return axios.get('https://v6.exchangerate-api.com/v6/6f56178fbe48f4d29af10e72/latest/USD');
}

/**
 * fix 1 ether = 2106
 */
export function ratioConverter() {

}