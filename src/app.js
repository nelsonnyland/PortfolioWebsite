const path = require("path");
const express = require("express");
const hbs = require("hbs");

//const github = require("./github.js");

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

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
});