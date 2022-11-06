enum CreatureSizes {
    Unknown,
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuant
}

class ArmourClassModel {
    armourClass: number;
    appliedFrom: string;
}

class SkillModifierModel {
    skillName: string;
    modifier: number;
}

class CreatureTraitModel {
    name: string;
    entries: string[];
}

class CreatureModel {
    name: string;
    sourceId: string;
    size: CreatureSizes;
    type: string;
    alignment: string[];
    armourClass: ArmourClassModel;
    hitpointAverage: number;
    hitpointFormula: string;
    hitpointSpecial: string;
    walkingSpeed: number;
    climbingSpeed: number;
    swimmingSpeed: number;
    flyingSpeed: number;
    attributeStr: number;
    attributeDex: number;
    attributeCon: number;
    attributeInt: number;
    attributeWis: number;
    attributeCha: number;
    skillModifiers: SkillModifierModel[];
    passivePerception: number;
    resistences: string[];
    immunities: string[];
    languages: string[];
    challengeRating: number;
    traits: CreatureTraitModel[];
    actions: CreatureTraitModel[];
    reactions: CreatureTraitModel[];
}

export default { CreatureModel, CreatureSizes, CreatureTraitModel, ArmourClassModel, SkillModifierModel}