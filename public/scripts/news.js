// news.js
// client-side js

const url = "https://api.github.com/users/nelsonnyland/events/public";
let apiStatus = document.getElementById("status");
let ulNews = document.getElementById("news");

// http://localhost:3000/api?address=https://api.github.com/users/nelsonnyland/events/public
fetch("http://localhost:3000/api?address=" + url).then((response) => {
    response.json().then((data) => {
        while (ulNews.firstChild) {
            ulNews.removeChild(ulNews.firstChild);
        }
        apiStatus.textContent = "Loading..."
        if (data.error) {
            apiStatus.textContent = "Error loading page."
            console.log(data.error);
        } else {
            apiStatus.parentNode.removeChild(apiStatus);
            for (let i = 0; i < data.length; i++) {
                // create type node
                let liParent = document.createElement("li");
                liParent.className = "li-parent";
                let strParent = addSpace(JSON.stringify(data[i].type));
                liParent.appendChild(document.createTextNode(delQuote(strParent)));
                
                // create sub list
                let ulChild = document.createElement("ul");
                ulChild.className = "li-child";
                liParent.appendChild(ulChild);
                
                // create repository node
                let aRepo = document.createElement("a");                
                aRepo.href = corrUrl(delQuote(JSON.stringify(data[i].repo.url)));
                let liRepo = document.createElement("li");
                liRepo.appendChild(document.createTextNode("Repository: "));
                let strRepo = delQuote(delParDir(JSON.stringify(data[i].repo.name)));
                aRepo.appendChild(document.createTextNode(strRepo));
                liRepo.appendChild(aRepo);
                ulChild.appendChild(liRepo);

                // create branch node
                if (data[i].payload.ref) {
                    let liBranch = document.createElement("li");
                    let strBranch = "Branch: " + delParDir(delQuote(JSON.stringify(data[i].payload.ref)));
                    liBranch.appendChild(document.createTextNode(strBranch));
                    ulChild.appendChild(liBranch);
                }

                // create commit node
                if (data[i].payload.commits) {
                    let liCommit = document.createElement("li");
                    let strCommit = "Commit: " + JSON.stringify(data[i].payload.commits[0].message);
                    liCommit.appendChild(document.createTextNode(strCommit));
                    ulChild.appendChild(liCommit);
                }
                
                // create action node
                if (data[i].payload.action) {
                    let liAction = document.createElement("li");
                    let strAction = "Action: " + delQuote(JSON.stringify(data[i].payload.action));
                    liAction.appendChild(document.createTextNode(strAction));
                    ulChild.appendChild(liAction);
                }

                if (data[i].payload.issue) {
                    // create title node
                    let aTitle = document.createElement("a");
                    aTitle.href = corrUrl(delQuote(JSON.stringify(data[i].payload.issue.url)));
                    let liTitle = document.createElement("li");
                    liTitle.appendChild(document.createTextNode("Title: "));
                    let strTitle = JSON.stringify(data[i].payload.issue.title);
                    aTitle.appendChild(document.createTextNode(strTitle));
                    liTitle.appendChild(aTitle);
                    ulChild.appendChild(liTitle);

                    // create label node
                    let liLabel = document.createElement("li");
                    let strLabel = "Label: " + delQuote(JSON.stringify(data[i].payload.issue.labels[0].name));
                    liLabel.appendChild(document.createTextNode(strLabel));
                    ulChild.appendChild(liLabel);
                }
                
                // append nodes to parent
                ulNews.appendChild(liParent);
            }
        }
    });
});

function delQuote(str) {
    return str.replace(/\"/g, "");
}

function delParDir(str) {
    return str.substring(str.lastIndexOf("/") + 1);
}

function addSpace(str) {
    return str.replace(/([a-z])([A-Z])/, '$1 $2');
}

function corrUrl(str) {
    return str.replace("api.", "").replace("repos/", "");
}