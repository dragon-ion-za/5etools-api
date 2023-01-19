const path = require('path');

import { characterEntityToModelConverter } from "../converters/character.converter";
import { readFile } from "../services/readFile.service";

import { CharacterEntity } from "../entities/character.entity";
import { CharacterModel } from "../models/character.model";
import ExpandedPartyModel from "../models/expandedParty.model";
import PartyModel from "../models/party.model";

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

    characters.forEach((characterName) => {
        let foundCharacter: CharacterEntity = jsonCharacters.playerCharacters.filter((x: CharacterEntity) => x.name == characterName)[0];

        if (foundCharacter) {
            model.push(characterEntityToModelConverter(foundCharacter))
        }
    });

    return model;
};
