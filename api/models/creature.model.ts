export enum CreatureSizes {
    Unknown = 0,
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuant
}

export enum SpellTypes {
    Unknown = 0,
    Slot,
    Daily,
    Each
}

export class ArmourClassModel {
    armourClass: number;
    appliedFrom: string;
    condition: string = '';
    alternateForms: ArmourClassModel[] = [];

    constructor(ac: number, appliedFrom: string, condition: string = '') {
        this.armourClass = ac;
        this.appliedFrom = appliedFrom;
        this.condition = condition;
    }
}

export class SkillModifierModel {
    skillName: string;
    modifier: number;

    constructor(name: string, modifier: number) {
        this.modifier = modifier;
        this.skillName = name;
    }
}

export class CreatureTraitModel {
    name: string;
    entries: string[];

    constructor(name: string, entries: string[]) {
        this.name = name;
        this.entries = entries;
    }
}

export class ResistanceModel {
    resistantTo: string;
    condition: string;

    constructor(resistantTo: string, condition: string) {
        this.resistantTo = resistantTo;
        this.condition = condition;
    }
}

export class SpellcastingModel {
    name: string = '';
    entries: string[] = [];
    atWill: string[] = [];
    withResources: KnownSpellsModel[] = [];
    ability: string = '';
}

export class KnownSpellsModel {
    type: SpellTypes = SpellTypes.Unknown;
    resource: string = '';
    level: string = '';
    spells: string[] = [];
}

export class CreatureModel {
    name: string;
    sourceId: string = '';
    size: CreatureSizes = CreatureSizes.Unknown;
    type: string = '';
    alignment: string[] = [];
    armourClass: ArmourClassModel | null = null;
    hitpointAverage: number = 0;
    hitpointFormula: string = '';
    hitpointSpecial: string = '';
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
    skillModifiers: SkillModifierModel[] = [];
    passivePerception: number = 0;
    resistances: ResistanceModel[] = [];
    immunities: ResistanceModel[] = [];
    languages: string[] = [];
    challengeRating: number = 0;
    traits: CreatureTraitModel[] = [];
    actions: CreatureTraitModel[] = [];
    reactions: CreatureTraitModel[] = [];
    spellcasting: SpellcastingModel[] = [];

    constructor (name: string) {
        this.name = name;
    }
}