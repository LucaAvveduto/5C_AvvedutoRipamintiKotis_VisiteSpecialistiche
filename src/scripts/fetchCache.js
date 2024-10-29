import { parseConfiguration } from "./jsonParser.js" 
export function fetchCache(service, data) { 
    return parseConfiguration("../../config.json").then(config => {
        return new Promise(function (reso, reje) {
            fetch(config.cacheURL + service, {
                method: "POST",
                body: data ? JSON.stringify({
                    key: config.cacheKey,
                    value: JSON.stringify(data)
                }) : JSON.stringify({
                    key: config.cacheKey,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "key": config.cacheToken
                }
            })
                .then((reponse) => reponse.json())
                .then((data) => reso(data))
                .catch((error) => reje(error));
        });
    })
    .catch(console.error);
}
