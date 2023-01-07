const API_URL = process.env.REACT_APP_API_URL

export async function get(url, params) {

    const path = API_URL + url + "?" + new URLSearchParams(params);
    const response = await fetch(path)
        .then(res => res.json())
        .then(data => {
            return data;
        });
    return response;
}