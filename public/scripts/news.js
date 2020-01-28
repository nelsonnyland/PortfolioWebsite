// news.js
// client-side js

const url = "https://api.github.com/users/nelsonnyland/events/public";
const status = document.getElementById("status");
const news = document.getElementById("news");

fetch("http://localhost:3000/api?address=" + url).then((response) => {
    response.json().then((data) => {
        while (news.firstChild) {
            news.removeChild(news.firstChild);
        }
        status.textContent = "Loading..."
        if (data.error) {
            status.textContent = "Error loading page."
            console.log(data.error);
        } else {
            for (let i = 0; i < data.length; i++) {
                // create type node
                let liHeader = document.createElement("li");
                let typeStr = JSON.stringify(data[i].type);
                let removeEvent = typeStr.replace("Event", "");
                liHeader.appendChild(document.createTextNode(replace(removeEvent)));
                // create sub list
                let ulSub = document.createElement("ul");
                liHeader.appendChild(ulSub);
                // create repo node
                let liRepo = document.createElement("li");
                let repoStr = "repo: " + JSON.stringify(data[i].repo.name);
                liRepo.appendChild(document.createTextNode(replace(repoStr)));
                ulSub.appendChild(liRepo);
                // append nodes to news
                news.appendChild(liHeader);
            }
            status.textContent = "";
        }
    });
});

function replace(str) {
    return str.replace(/\"/g, "");
}