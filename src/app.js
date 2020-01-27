// app.js
// server-side js

const dotenv = require("dotenv").config();
if (dotenv.error) {
    console.log(dotenv.parsed);
}

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");

const app = express();

const pubDir = path.join(__dirname, "../public");
const viewDir = path.join(__dirname, "../templates/views");
const partDir = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");

app.set("views", viewDir); 

hbs.registerPartials(partDir);

app.use(express.static(pubDir));

app.get("", (req, res) => {
    res.render("index");
});

app.get("/news", (req, res) => {
    res.render("news");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/api", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a search term."
        });
    }
    
    const url = req.query.address;
    
    const authorization = {
        "User-Agent": "request",
        "Authorization": `TOKEN ${process.env.TOKEN}`
    };
    
    const options = {
        url,
        headers: authorization
    };
    
    request(options, callback);
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.send(data);
        } else {
            console.log("ERROR: " + error);
            console.log("RESPONSE: " + response);
            console.log("BODY: " + body);
        }
    }
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});