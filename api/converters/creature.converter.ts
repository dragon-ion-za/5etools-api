import { Ac, CreatureEntity, ComplexSpeed, Speed, Type } from "../entities/creature.entity";
import { ArmourClassModel, CreatureModel, CreatureSizes, SkillModifierModel } from "../models/creature.model";

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