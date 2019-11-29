
const news = require("./news.js");

const issuesURL = "https://api.github.com/search/issues?q=author:nelsonnyland:";
const commitsURL = "https://api.github.com/search/commits?q=author:nelsonnyland:";
const feedsURL = "https://api.github.com/feeds";
const profileURL = "https://api.github.com/users/nelsonnyland";
const activitiesURL = "https://api.github.com/users/nelsonnyland/events/public";

// fetch api data
// async function getData(url) {
//     let response = await fetch(url, {
//         "method" : "GET",
//         "headers" : {
//             "Authorization" : `${process.env.TOKEN}`
//         }
//     });
//     let data = await response.json();
//     // console logs tests:
//     console.log("getData:");
//     console.log(data);
//     return data;
// }

// on news page load:
// getData(activitiesURL)//.then(data => postNews(data));
