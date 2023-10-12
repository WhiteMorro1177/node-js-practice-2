'use strict';

const express = require("express");
const { invalidPathHandler } = require("./handlers.js");
const { data, find } = require("./data.js")
const os = require("node:os");


const app = express();



// config
const port = 3000;

// main route
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// information route
app.get("/info", (req, res) => res.send(`${os.platform()} ${os.arch()}, ${os.version()}`));

// list of entities route
app.get("/entities", (req, res) => res.send(data.map(item => item.name)));

// one entity route
app.get("/entities/:id", (req, res) => res.send(find(req.params.id)));

// redirect on main page
app.use(invalidPathHandler);

app.listen(port, () => console.log("Server up and running on port", port));