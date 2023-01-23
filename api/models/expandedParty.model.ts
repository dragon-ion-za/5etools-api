import { CharacterModel } from "./character.model";

class ExpandedPartyModel {
    name: string;
    characters: CharacterModel[];

    constructor (name: string, characters: CharacterModel[]) {
        this.name = name;
        this.characters = characters;
    }
}

export default ExpandedPartyModel;