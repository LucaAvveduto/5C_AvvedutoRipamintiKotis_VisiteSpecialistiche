import {cacheKey, cacheToken, cacheURL} from "../../config.js";
export function fetchCache(service, data) {
    return new Promise(function(resolve, reject) {
        fetch(cacheURL + service,{
            method: "POST",
            body: data ? JSON.stringify({
                key: cacheKey,
                value: JSON.stringify(data)
            }): JSON.stringify({
                key: cacheKey,
            }),
            headers: {
                "Content-Type": "application/json",
                "key": cacheToken
            }
        })
        .then((reponse) => reponse.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
}