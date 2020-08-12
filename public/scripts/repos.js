// repos.js
// client-side js

// http://localhost:3000/api?address=https://api.github.com/users/nelsonnyland/repos
const url = "https://api.github.com/users/nelsonnyland/repos";
let apiStatus = document.getElementById("repos-status");
let ulRepos = document.getElementById("repos");

// https://developer.github.com/v3/
// [base url]/api?address=[api url]
fetch("/api?address=" + url).then((response) => {
    response.json().then((data) => {
        while (ulRepos.firstChild) {
            ulRepos.removeChild(ulRepos.firstChild);
        }
        apiStatus.textContent = "Loading repos...";
        if (data.error) {
            apiStatus.textContent = "Error loading repos. See logs.";
            console.log(data.error);
        } else {
            apiStatus.parentNode.removeChild(apiStatus);
            for (let i = 0; i < data.length; i++) {
                // create name node
                let liParent = document.createElement("li");
                liParent.className = "li-parent";
                let strParent = JSON.stringify(data[i].name);
                liParent.appendChild(document.createTextNode(strParent));
                // append nodes to parent
                ulRepos.appendChild(liParent);
            }
        }
    });
});