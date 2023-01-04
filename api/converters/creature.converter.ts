import { Ac, CreatureEntity, ComplexSpeed, Speed, Type, ComplexResist, ComplexImmunity, Trait, Spellcasting } from "../entities/creature.entity";
import { ArmourClassModel, CreatureModel, CreatureSizes, CreatureTraitModel, KnownSpellsModel, ResistanceModel, SkillModifierModel, SpellcastingModel, SpellTypes } from "../models/creature.model";

export function creatureEntityToModelConverter(entity: CreatureEntity): CreatureModel {
    let model: CreatureModel = new CreatureModel(entity.name);

    model.sourceId = entity.source;
    model.size = convertSizeToEnum(entity.size);
    model.type = (entity.type as Type)?.type ?? entity.type as string;
    model.alignment = entity.alignment;
    model.armourClass = convertToArmourClassModel(entity.ac);
    model.hitpointAverage = entity.hp.average;
    model.hitpointFormula = entity.hp.formula;
    model.hitpointSpecial = entity.hp.special;
    model.walkingSpeed = entity.speed.walk;
    model.climbingSpeed = entity.speed.climb;
    model.burrowingSpeed = entity.speed.burrow;
    model.swimmingSpeed = entity.speed.swim;
    model.flyingSpeed = convertToFlyingSpeed(entity.speed.fly);
    model.canHover = entity.speed.canHover;
    model.speedConditions = buildSpeedConditions(entity.speed);
    model.attributeCha = entity.cha;
    model.attributeCon = entity.con;
    model.attributeDex = entity.dex;
    model.attributeInt = entity.int;
    model.attributeStr = entity.str;
    model.attributeWis = entity.wis;
    model.skillModifiers = buildSkillModifiers(entity.skill);
    model.passivePerception = entity.passive;
    model.resistances = buildResistances(entity.resist);
    model.immunities = buildImmunities(entity.immune, entity.conditionImmune);
    model.languages = entity.languages;
    model.challengeRating = Number.parseInt(entity.cr);
    model.traits = buildTraits(entity.trait);
    model.actions = buildTraits(entity.action);
    model.reactions = buildTraits(entity.reaction);
    model.spellcasting = buildSpellcasting(entity.spellcasting);

    return model;
};

function convertSizeToEnum(entitySize: string[]) : CreatureSizes {
    switch (entitySize[0].toLowerCase()) {
        case 't': return CreatureSizes.Tiny;
        case 's': return CreatureSizes.Small;
        case 'm': return CreatureSizes.Medium;
        case 'l': return CreatureSizes.Large;
        case 'h': return CreatureSizes.Huge;
        case 'g': return CreatureSizes.Gargantuant;
        default: return CreatureSizes.Unknown;
    }
}

function convertToArmourClassModel(entityAc: Ac[] | number[]): ArmourClassModel {    
    if (typeof entityAc[0] === "number") {
        let acNumbers: number[] = entityAc as number[];
        return new ArmourClassModel(acNumbers[0], '');
    } else {        
        let acArray: Ac[] = entityAc as Ac[];
        let acModel = new ArmourClassModel(acArray[0].ac, acArray[0].from?.[0] ?? '');
        acArray.slice(1).forEach(acEntity => {
            acModel.alternateForms.push(new ArmourClassModel(acEntity.ac, acEntity.from?.[0] ?? '', acEntity.condition));
        })
        return acModel;
    }
}

function convertToFlyingSpeed(entityFly: ComplexSpeed | number): number {
    if (!entityFly) return 0;

    if (typeof entityFly === "number") {
        return entityFly as number;
    } else {
        let fly = entityFly as ComplexSpeed;
        return fly.number;
    }
}

function buildSpeedConditions(entitySpeed: Speed): string[] {
    let speedConditions: string[] = [];

    if (entitySpeed.fly && typeof entitySpeed.fly === "object") {
        let fly = entitySpeed.fly as ComplexSpeed;
        if (fly.condition !== '') {
            speedConditions.push(fly.condition);
        }
    }

    return speedConditions;
}

function buildSkillModifiers(entitySkill: any): SkillModifierModel[] {
    if (!entitySkill) return [];

    let skillMods: SkillModifierModel[] = [];

    Object.keys(entitySkill).forEach((key, index) => {        
        skillMods.push(new SkillModifierModel(key, entitySkill[index] as number));
    });

    return skillMods;
}

function buildResistances(entityResist: any): ResistanceModel[] {
    if (!entityResist) return [];

    let resistances: ResistanceModel[] = [];

    Object.keys(entityResist).forEach((key, index) => {
        if (typeof entityResist[index] === 'string') {
            resistances.push(new ResistanceModel(entityResist[index] as string, ''));
        } else {
            let complexEntityResist: ComplexResist = entityResist[index] as ComplexResist;

            if (complexEntityResist.special) {
                resistances.push(new ResistanceModel(complexEntityResist.special, 'special'));
            } else {
                complexEntityResist.resist.forEach(x => resistances.push(new ResistanceModel(x, complexEntityResist.note)));
            }
        }
        
    });

    return resistances;
}

function buildImmunities(entityImmune: any, entityConditionImmune: any): ResistanceModel[] {
    let immunities: ResistanceModel[] = [];
    
    if (entityImmune) {
        Object.keys(entityImmune ?? []).forEach((key, index) => {
            if (typeof entityImmune[index] === 'string') {
                immunities.push(new ResistanceModel(entityImmune[index] as string, ''));
            } else {
                let complexEntityResist: ComplexImmunity = entityImmune[index] as ComplexImmunity;
    
                if (complexEntityResist.special) {
                    immunities.push(new ResistanceModel(complexEntityResist.special, 'special'));
                } else {
                    complexEntityResist.immune.forEach(x => immunities.push(new ResistanceModel(x, complexEntityResist.note)));
                }
            }
            
        });
    }

    if (entityConditionImmune) {
        Object.keys(entityConditionImmune ?? []).forEach((key, index) => {
            if (typeof entityConditionImmune[index] === 'string') {
                immunities.push(new ResistanceModel(entityConditionImmune[index] as string, ''));
            } else {
                let complexEntityResist: ComplexImmunity = entityConditionImmune[index] as ComplexImmunity;
    
                if (complexEntityResist.special) {
                    immunities.push(new ResistanceModel(complexEntityResist.special, 'special'));
                } else {
                    complexEntityResist.immune.forEach(x => immunities.push(new ResistanceModel(x, complexEntityResist.note)));
                }
            }
            
        });
    }

    return immunities;
}

function buildTraits(entityTraits: Trait[]) : CreatureTraitModel[] {
    let traits: CreatureTraitModel[] = [];

    entityTraits?.forEach(x => traits.push(new CreatureTraitModel(x.name, x.entries)));

    return traits;
}

function buildSpellcasting(entitySpellcasting: Spellcasting[]) : SpellcastingModel[] {
    let spells: SpellcastingModel[] = [];

    entitySpellcasting?.forEach((spellcasting: Spellcasting) => {
        let model: SpellcastingModel = new SpellcastingModel();
        model.name = spellcasting.name;
        model.ability = spellcasting.ability;

        if (spellcasting.will && spellcasting.will.length > 0) {
            spellcasting.will.forEach(x => model.atWill.push(x));
        }

        if (spellcasting.daily !== undefined) {
            for (const key in spellcasting.daily){
                let limitedSpells: KnownSpellsModel = new KnownSpellsModel();

                let matches = key.matchAll(/(\n?)(\w?)/g);
                let resourceLimit: string = '';
                let resourceLimitType: string = '';

                for (const match of matches) {
                    if (match.index === 0) {
                        resourceLimit = match[0];
                    }
                    if (match.index === 1) {
                        resourceLimitType = match[0];
                    }
                }

                switch (resourceLimitType) {
                    case '': limitedSpells.type = SpellTypes.Daily; break;
                    case 'e': limitedSpells.type = SpellTypes.Each; break;
                    default: limitedSpells.type = SpellTypes.Unknown;
                }

                limitedSpells.resource = resourceLimit;
                spellcasting.daily[key].forEach(x => limitedSpells.spells.push(x));
                model.withResources.push(limitedSpells);
            }
        }

        if (spellcasting.spells !== undefined) {
            for (const key in spellcasting.spells){
                let limitedSpells: KnownSpellsModel = new KnownSpellsModel();
                limitedSpells.type = SpellTypes.Slot;
                limitedSpells.resource = (spellcasting.spells[key].slots ?? 0).toString();
                limitedSpells.level = key;
                spellcasting.spells[key].spells.forEach(x => limitedSpells.spells.push(x));
                model.withResources.push(limitedSpells);
            }
        }

        spells.push(model);
    });
    return spells;
}