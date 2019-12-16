const request = require("request");

const options = {
    url: "https://api.github.com/users/nelsonnyland/events/public",
    headers: {
        "User-Agent": "request",
        "Authorization": "TOKEN"
    }
};

const getNews = () => {
    request(options, callback);
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        console.log(data);
        news.postNews(data);
    } else {
        console.log("ERROR" + error);
        console.log("RESPONSE" + response);
        console.log("BODY" + body);
    }
}

module.exports = {
    getNews: getNews
}