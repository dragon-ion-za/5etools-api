const path = require('path');

import { creatureEntityToModelConverter } from "../converters/creature.converter";
import { CreatureEntity } from "../entities/creature.entity";
import { CreatureModel } from "../models/creature.model";
import { readFile } from "../services/readFile.service";

export class CreaturesController {

    public static getCreatures = (req: any, res: any) => {
        const files = ['bestiary-mm.json', 'bestiary-dmg.json', 'bestiary-phb.json', 'bestiary-idrotf.json'];
    
        let creatures: CreatureModel[] = [];
        let dataFilter = this.buildOdataCreatureFilter(req.query);
    
        let legendaryGroups = readFile(`../data/bestiary/legendarygroups.json`);
    
        files.forEach(file => {
            let jsonCreatures = readFile(`../data/bestiary/${file}`);
            jsonCreatures.monster
                .filter((x: CreatureEntity) => x._copy == null)
                .filter((x: CreatureEntity) => dataFilter(x))
                .map((x: CreatureEntity) => creatureEntityToModelConverter(x, legendaryGroups.legendaryGroup))
                .forEach((x: CreatureModel) => creatures.push(x));
        });
    
        res.send(creatures);
    }
    
    public static getCreatureImage = (req: any, res: any) => {
        res.sendFile(`img/${req.params.sourceId}/${req.params.name}.png`, { root: path.join(__dirname, '../') });
    };
    
    private static buildOdataCreatureFilter(reqQuery: any) : (x: CreatureEntity) => any {
    
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

}