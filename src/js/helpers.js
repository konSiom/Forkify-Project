import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function (url) {
    try {

        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        console.log(res);
        const data = await res.json();
        if (!res.ok) throw new Error(`Error ${res.status} ${res.statusText}`);
        return data;
    } catch (err) {
        throw err;

    }
};

export const postJSON = async function (url, uploadData) {
    try {
        const fetch1 = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData),
        });

        const res = await Promise.race([fetch1, timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        //console.log(uploadData);

        return data;


    } catch (err) {
        throw err


    }
}