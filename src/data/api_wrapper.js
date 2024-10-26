import axios from "axios";
import { makeCancelable } from "../utils/utils";

export class APIWrapper {
    constructor({
        baseUrl = "",
        userToken = undefined,
    }) {
        this.baseUrl = baseUrl;
        this.userToken = userToken;
    }

    request = ({
        path = '',
        method = 'GET',
        body = {},
        additionalHeaders = {},
        signal,
        metadata,
    }) => {
        return makeCancelable(new Promise(async (resolve, reject) => {
            try {
                if (path.startsWith('/'))
                    path = path.substring(1);
                var options = {
                    method,
                    headers: {
                        'Content-Type': metadata ? metadata : 'application/json',
                        ...additionalHeaders,
                    },
                    signal,
                    validateStatus: (status) => status > 0,
                };
                if (this.userToken !== undefined)
                    options.headers['Authorization'] = `Bearer ${this.userToken}`
                if (method == 'POST')
                    options.body = JSON.stringify(body);
                if (method == 'PUT' || method == 'put')
                    options.body = JSON.stringify(body);
                var url = this.baseUrl + path;
                console.log(url);
                if (method === 'GET') {
                    axios.get(url, { ...options }).then((res) => {
                        if (res.status == 404)
                            res.data = { code: 404, error: res.statusText, _data: undefined };
                        resolve({
                            ...res.data,
                            isSuccess: res.status >= 200 && res.status < 300,
                        });
                    }).catch(err => {
                        // console.log(err.response.status)
                        // console.log(err.response)
                        // console.log(`axios.catch`,err);
                        if (err.response != undefined) {
                            resolve({
                                ...err.response._data,
                                isSuccess: false,
                            })
                            return;
                        }
                        resolve({
                            isSuccess: false,
                            code: err.status,
                            error: err.statusText,
                        })
                    });
                }
                else if (method == "post" || method == "POST") {
                    console.log(`post=>${url}=>`, body);
                    axios.post(url, body, options).then((res) => {
                        resolve({
                            ...res.data,
                            isSuccess: res.status >= 200 && res.status < 300,
                        });
                    }).catch(err => {
                        console.log(`axios.post.catch`, err);
                        console.log(`axios.post.catch`, err.response);
                        // console.log(`fuck this shit`)
                        if (err.response != undefined) {
                            resolve({
                                ...err.response.data,
                                isSuccess: false,
                            })
                        }
                        resolve({
                            isSuccess: false,
                            code: err.status,
                            error: err.statusText,
                        })
                    });
                }
                else {
                    console.log(`put body=>${url}=>`, body);
                    axios.put(url, body, options).then((res) => {
                        resolve({
                            ...res.data,
                            isSuccess: res.status >= 200 && res.status < 300,
                        });
                    }).catch(err => {
                        console.log(`axios.post.catch`, err);
                        console.log(`axios.post.catch`, err.response);
                        if (err.response != undefined) {
                            resolve({
                                ...err.response.data,
                                isSuccess: false,
                            })
                        }
                        resolve({
                            isSuccess: false,
                            code: err.status,
                            error: err.statusText,
                        })
                    });
                }

            } catch (err) {
                console.log(`request.catch`, err);
                reject(err);
            }
        }));
    }
    siteUrl = (path) => {
        if (path.indexOf('http') != -1)
            return path;
        if (path.startsWith('/'))
            path = path.substring(1);
        if (path.indexOf('storage/') == -1)
            path = `storage/` + path;
        return (this.baseUrl + path).replace('api/', '');
    }

}