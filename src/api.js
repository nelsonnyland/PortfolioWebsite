const request = require("request");

const authorization = {
    "User-Agent": "request",
    "Authorization": `TOKEN ${process.env.TOKEN}`
};

const repoOpt = {
    url: "https://api.github.com/users/nelsonnyland",
    headers: authorization
};

const newsOpt = {
    url: "https://api.github.com/users/nelsonnyland/events/public",
    headers: authorization
};

//#region old api code
// const getNews = () => {
//     return request(newsOpt, callback);
// };

// const getRepos = () => {
//     return request(repoOpt, callback);
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         const data = JSON.parse(body);
//         console.log("DATA: " + JSON.stringify(data));
//         return data;
//     } else {
//         console.log("ERROR" + error);
//         console.log("RESPONSE" + response);
//         console.log("BODY" + body);
//     }
// }
//#endregion



module.exports = {
    getRepos: getRepos,
    getNews: getNews
}