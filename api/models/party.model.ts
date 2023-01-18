class PartyModel {
    name: string;
    characters: string[];

    constructor (name: string, characters: string[]) {
        this.name = name;
        this.characters = characters;
    }
}

export default PartyModel;