const express = require("express");
const bodyParser = require("body-parser");  
const fs = require("fs");

import AdventureModel from './models/adventure.model'

const app = express();
  
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get('/adventures', (req: any, res: any) => {
    fs.readFile(
        "../data/adventures.json", "utf8", (err: any, jsonString: any) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }

            let adventures: AdventureModel[] = [];
            let jsonAdventures = JSON.parse(jsonString);

            adventures = jsonAdventures.adventure.map((x: any) => new AdventureModel(x.name, x.id, x.level.start, x.level.end));

            res.send(adventures);
    });
});

app.get('/adventures/:id', (req: any, res: any) => {
    fs.readFile(
        "../data/adventures.json", "utf8", (err: any, jsonString: any) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }

            let adventure: AdventureModel;
            let jsonAdventures = JSON.parse(jsonString);

            let foundAdventure = jsonAdventures.adventure.find((x: any) => x.id === req.params.id);

            if (foundAdventure === undefined) {
                res.send('Error, not found');
            }

            adventure = new AdventureModel(foundAdventure.name, foundAdventure.id, foundAdventure.level.start, foundAdventure.level.end);

            res.send(adventure);
    });
});
  
app.listen(5001, function() {
    console.log("Server started on port 5001");
});