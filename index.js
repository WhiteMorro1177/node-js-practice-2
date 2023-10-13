'use strict';

const express = require("express");
const { data, find, add, update, remove } = require("./data.js")
const { getFilePath, getOsConfig } = require("./helper.js")


const app = express();
app.use(express.json());

// config
const port = 3000;

// main route
app.get("/", (req, res) => {
    const filePath = getFilePath();
    res.set("Content-Type", "text/html").status(200).sendFile(filePath);
});

// information route
app.get("/info", (req, res) => { 
    const osConfig = getOsConfig();
    res.set("Content-Type", "text/plain").status(200).send(osConfig);
});

// list of entities route
app.get("/entities", (req, res) => {
    const entitiesNames = data.map(item => item.name);
    res.set("Content-Type", "text/plain").status(200).send(entitiesNames);
});

// one entity route
app.get("/entities/:id", (req, res) => {
    const entityId = Number(req.params.id);
    res.set("Content-Type", "application/json").status(200).send(find(entityId));
});

// add new entity
app.post("/entities", (req, res) => {
    console.log("Entity to add", req.body);
    const entityToAdd = req.body;
    const entity = find(entityToAdd.id)

    // check id
    if (entity !== undefined) {
        res.status(404).send("ID already exist");
        return;
    }

    add(entityToAdd);
    res.set("Content-Type", "application/json").status(200).send(entity);
});

// update entity
app.patch("/entities/:id", (req, res) => {
    const entityToUpdateId = Number(req.params.id);
    const entity = find(entityToUpdateId);
    if (entity == undefined) {
        res.status(404).send("Cannot find entity");
        return;
    }
    if (req.body === undefined) {
        res.status(404).send("Body is empty");
        return;
    }
    const newEntityName = req.body.name;
    update(entityToUpdateId, newEntityName);
    res.set("Content-Type", "application/json").status(200).send(entity);

});

// remove entity
app.delete("/entities/:id", (req, res) => {
    const entityToDeleteId = Number(req.params.id);
    const entity = find(entityToDeleteId);
    console.log("Entity to delete", entity);

    
    if (entity === undefined) {
        res.status(404).send("Cannot find entity");
        return;
    }

    remove(entityToDeleteId)
    res.set("Content-Type", "application/json").status(200).send(entity);
});

// redirect on main page
app.get("/*", (req, res) => { res.redirect("/"); })

app.listen(port, () => console.log("Server up and running on port", port));