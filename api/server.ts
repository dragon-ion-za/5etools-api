const express = require("express");
const bodyParser = require("body-parser");  
const fs = require("fs");
const cors = require('cors');
const path = require('path');

import AdventureModel from './models/adventure.model'
import { CreatureModel } from './models/creature.model'
import { CreatureEntity } from './entities/creature.entity'
import { creatureEntityToModelConverter } from './converters/creature.converter';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
  
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
    let dataFilter = BuildOdataCreatureFilter(req.query);

    files.forEach(file => {
        let jsonString = fs.readFileSync(`../data/bestiary/${file}`, 'utf8');
        let jsonCreatures = JSON.parse(jsonString);
        jsonCreatures.monster
            .filter((x: CreatureEntity) => x._copy == null)
            .filter((x: CreatureEntity) => dataFilter(x))
            .map((x: CreatureEntity) => creatureEntityToModelConverter(x))
            .forEach((x: CreatureModel) => creatures.push(x));
    });

    res.send(creatures);
});

app.get('/creatures/image/:sourceId/:name', (req: any, res: any) => {
    res.sendFile(`img/${req.params.sourceId}/${req.params.name}.png`, { root: path.join(__dirname, '../') });
});
  
app.listen(5001, function() {
    console.log("Server started on port 5001");
});

function BuildOdataCreatureFilter(reqQuery: any) : (x: CreatureEntity) => any {

    if (reqQuery.$filter) {
        let filterValues: string[] = reqQuery.$filter.split(' ');

        return (x: CreatureEntity) => { 
            type ObjectKey = keyof typeof x;
            const filterKey = filterValues[0] as ObjectKey;

            let searchValue = filterValues.slice(2).join(' ');

            switch (filterValues[1]) {
                case 'like':
                    return (x[filterKey] as string).toLocaleLowerCase().indexOf(searchValue) > -1;

                default:
                    return (x[filterKey] as string).toLocaleLowerCase() === searchValue;
            }

            
        };
    }

    return (x: CreatureEntity) => { return true; };
}