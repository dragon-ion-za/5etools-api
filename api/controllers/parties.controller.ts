const path = require('path');

import { characterEntityToModelConverter } from "../converters/character.converter";
import { readFile } from "../services/readFile.service";

import { CharacterEntity } from "../entities/character.entity";
import { CharacterModel } from "../models/character.model";
import ExpandedPartyModel from "../models/expandedParty.model";
import PartyModel from "../models/party.model";
import { ItemEntity } from "../entities/item.entity";

export class PartiesController { 
    public static getParties = (req: any, res: any) => {
        let jsonParties = readFile(`../data/parties.json`);
        let parties: PartyModel[] = jsonParties.parties.map((x: any) => new PartyModel(x.name, x.characters));
    
        res.send(parties);
    };
    
    public static getPartyByName = (req: any, res: any) => {
        let jsonParties = readFile(`../data/parties.json`);    
        let foundParty = jsonParties.parties.find((x: any) => x.name.toLocaleLowerCase() === req.params.name.toLocaleLowerCase());
    
        if (foundParty === undefined) {
            res.send('Error, not found');
        }

        let expandedParty: ExpandedPartyModel = new ExpandedPartyModel(foundParty.name, expandPartyMembers(foundParty.characters));

        res.send(expandedParty);
    };

    public static getCharacterImage = (req: any, res: any) => {
        res.sendFile(`img/playerCharacters/${req.params.name}.png`, { root: path.join(__dirname, '../../') });
    };
}

const expandPartyMembers = (characters: string[]) : CharacterModel[] => {
    let model: CharacterModel[] = [];

    let jsonCharacters = readFile(`../data/playerCharacters.json`);
    let jsonBaseItems = readFile(`../data/items-base.json`);
    let jsonItems = readFile(`../data/items.json`);

    let allItems: ItemEntity[] = jsonBaseItems.baseitem.concat(jsonItems.item);

    characters.forEach((characterId) => {
        let foundCharacter: CharacterEntity = jsonCharacters.playerCharacters.filter((x: CharacterEntity) => x.id == characterId)[0];

        if (foundCharacter) {
            model.push(characterEntityToModelConverter(foundCharacter, allItems))
        }
    });

    return model;
};
