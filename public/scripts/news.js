// news.js
// client-side js

const url = "https://api.github.com/users/nelsonnyland/events/public";
const news = document.getElementById("news");

news.textContent = "Loading...";

fetch("http://localhost:3000/api?address=" + url).then((response) => {
    debugger
    response.json().then((data) => {
        if (data.error) {
            news.textContent = data.error;
        } else {
            news.textContent = data;
        }
    });
});
