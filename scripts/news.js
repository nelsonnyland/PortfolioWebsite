
// display data to newsfeed
function postNews(data) {
    let article = document.getElementById("article");
    for (item of data) {
        article.appendChild(document.createTextNode(item.login));
        article.appendChild(document.createElement("br"));
    }
    //article.appendChild(document.createTextNode(JSON.stringify(data)));
}

