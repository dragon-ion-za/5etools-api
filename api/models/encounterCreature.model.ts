import { CreatureModel } from "./creature.model";

export class EncounterCreatureModel extends CreatureModel {
    id: string = '';
    hitpointMax: number = 0;
    currentHitpoints: number = 0;
    initiative: number = 0;
    isPlayerCharacter: boolean = false;
}