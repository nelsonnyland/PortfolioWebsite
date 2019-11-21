// console.log("NEWS CONNECTED");
"use strict";
/**
 * news.js
 * This API connects to my GitHub profile and gets
 * the current newsfeed.
 * @author Nelson Nyland
 * @version 1.0 (Nov 20, 2019)
 */

const issuesURL = "https://api.github.com/search/issues?q=author:nelsonnyland:";
const commitsURL = "https://api.github.com/search/commits?q=author:nelsonnyland:";
const feedsURL = "https://api.github.com/feeds";
const profileURL = "https://api.github.com/users/nelsonnyland";
const activitiesURL = "https://api.github.com/users/nelsonnyland/events/public";

let TOKEN = $("TOKEN");
let PRODUCTION = $("PRODUCTION");

// function $(id) {
//     return document.getElementById(id);
// }

// if PRODUCTION is false
async function getToken() {
    let baseURL = window.location.origin;
    let response = await fetch(baseURL + "/token.txt");
    TOKEN = await response.text();
}

// fetch api data
async function getData(url) {
    let response = await fetch(url, {
        "method" : "GET",
        "headers" : {
            "Authorization" : "token " + TOKEN
        }
    });
    let data = await response.json();
    // console logs tests:
    console.log("getData:");
    console.log(data);
    return data;
}

// display data to newsfeed
function postNews(data) {
    let article = document.getElementById("article");
    for (item of data) {
        article.appendChild(document.createTextNode(item.login));
        article.appendChild(document.createElement("br"));
    }
    //article.appendChild(document.createTextNode(JSON.stringify(data)));
}

window.onload = function() {
    if (PRODUCTION == "false") {
        getToken();
    }
    getData(activitiesURL)//.then(data => postNews(data));
}