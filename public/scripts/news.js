// news.js
// client-side js

const url = "https://api.github.com/users/nelsonnyland/events/public";
const news = document.getElementById("news");

news.textContent = "Loading...";

// http://localhost:3000/api?address=https://api.github.com/users/nelsonnyland/events/public
fetch("http://localhost:3000/api?address=" + url).then((response) => {
    response.json().then((data) => {
        data = JSON.stringify(data);
        if (data.error) {
            news.textContent = data.error;
        } else {
            news.textContent = data;
        }
    });
});
