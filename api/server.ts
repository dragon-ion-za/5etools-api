const express = require("express");
const bodyParser = require("body-parser");  
const fs = require("fs");

import AdventureModel from './models/adventure.model'
import { CreatureModel } from './models/creature.model'
import { CreatureEntity } from './entities/creature.entity'
import { creatureEntityToModelConverter } from './converters/creature.converter';

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

app.get('/creatures', (req: any, res: any) => {
    const files = ['bestiary-mm.json', 'bestiary-dmg.json', 'bestiary-phb.json', 'bestiary-idrotf.json'];

    let creatures: CreatureModel[] = [];

    files.forEach(file => {
        let jsonString = fs.readFileSync(`../data/bestiary/${file}`, 'utf8');
        let jsonCreatures = JSON.parse(jsonString);
        creatures.push(jsonCreatures.monster
            .filter((x: CreatureEntity) => x._copy == null)
            .map((x: CreatureEntity) => creatureEntityToModelConverter(x)));
    });

    res.send(creatures);
});
  
app.listen(5001, function() {
    console.log("Server started on port 5001");
});