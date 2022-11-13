export enum CreatureSizes {
    Unknown = 0,
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuant
}

export class ArmourClassModel {
    armourClass: number;
    appliedFrom: string;

    constructor(ac: number, appliedFrom: string ) {
        this.armourClass = ac;
        this.appliedFrom = appliedFrom;
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
    resistences: string[] = [];
    immunities: string[] = [];
    languages: string[] = [];
    challengeRating: number = 0;
    traits: CreatureTraitModel[] = [];
    actions: CreatureTraitModel[] = [];
    reactions: CreatureTraitModel[] = [];

    constructor (name: string) {
        this.name = name;
    }
}