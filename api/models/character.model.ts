import { CreatureSizes, SkillModifierModel, ResistanceModel, CreatureTraitModel, SpellcastingModel, SpecialActionModel } from "./sharedModels";

export class ClassModel {
    name: string;
    level: number;

    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
    }
}

export class CharacterModel {
    name: string;
    size: CreatureSizes = CreatureSizes.Unknown;
    level: number = 0;
    race: string = '';
    classes: ClassModel[] = [];
    hitpointMaximum: number = 0;
    proficiencyBonus: number = 0;
    walkingSpeed: number = 0;
    climbingSpeed: number = 0;
    burrowingSpeed: number = 0;
    swimmingSpeed: number = 0;
    flyingSpeed: number = 0;
    canHover: boolean = false;
    speedConditions: string[] = [];
    attributeStr: number = 0;
    attributeDex: number = 0;
    attributeCon: number = 0;
    attributeInt: number = 0;
    attributeWis: number = 0;
    attributeCha: number = 0;
    skillProficiencies: string[] = [];
    savingThrowProficiencies: string[] = [];
    passivePerception: number = 0;
    resistances: ResistanceModel[] = [];
    immunities: ResistanceModel[] = [];
    languages: string[] = [];
    traits: CreatureTraitModel[] = [];
    actions: CreatureTraitModel[] = [];
    reactions: CreatureTraitModel[] = [];
    spellcasting: SpellcastingModel[] = [];

    constructor (name: string) {
        this.name = name;
    }
}