import { Speed, Trait, Spellcasting } from "./sharedEntities";

export interface Class {
    name: string;
    level: number;
}

export interface CharacterEntity {
    id: string;
    name: string;
    size: string[];
    level: number;
    race: string;
    classes: Class[];
    profBonus: number;
    hp: number;
    speed: Speed;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    skill: string[];
    save: string[];
    passive: number;
    languages: string[];
    trait: Trait[];
    action: Trait[];
    reaction: Trait[];
    resist: object;
    immune: string[];
    conditionImmune: string[];
    spellcasting: Spellcasting[];
    equipment: string[];
}