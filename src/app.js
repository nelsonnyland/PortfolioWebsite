require("dotenv").config();

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");

//const api = require("./api.js");

const app = express();

const pubDir = path.join(__dirname, "../public");
const viewDir = path.join(__dirname, "../templates/views");
const partDir = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");

app.set("views", viewDir); 

hbs.registerPartials(partDir);

app.use(express.static(pubDir));

const authorization = {
    "User-Agent": "request",
    "Authorization": `TOKEN ${process.env.TOKEN}`
};

app.get("", (req, res) => {
    const options = {
        url: "https://api.github.com/users/nelsonnyland/repos",
        headers: authorization
    };
    
    request(options, callback);

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            //console.log("DATA: " + JSON.stringify(data));
            res.send(data);
        } else {
            console.log("ERROR" + error);
            console.log("RESPONSE" + response);
            console.log("BODY" + body);
        }
    }
});

app.get("/news", (req, res) => {
    const options = {
        url: "https://api.github.com/users/nelsonnyland/events/public",
        headers: authorization
    };
    
    request(options, callback);

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            //console.log("DATA: " + JSON.stringify(data));
            res.send(data);
        } else {
            console.log("ERROR" + error);
            console.log("RESPONSE" + response);
            console.log("BODY" + body);
        }
    }
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});