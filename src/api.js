const request = require("request");
debugger
const authorization = {
    "User-Agent": "request",
    "Authorization": "${process.env.TOKEN}"
};

const repoOpt = {
    url: "?",
    headers: authorization
};

const newsOpt = {
    url: "https://api.github.com/users/nelsonnyland/events/public",
    headers: authorization
};

const getNews = () => {
    return request(newsOpt, callback);
};

const getRepos = () => {
    return request(repoOpt, callback);
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        return data;
    } else {
        console.log("ERROR" + error);
        console.log("RESPONSE" + response);
        console.log("BODY" + body);
    }
}

module.exports = {
    getRepos: getRepos,
    getNews: getNews
}