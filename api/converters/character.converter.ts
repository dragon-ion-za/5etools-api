import { CharacterEntity } from "../entities/character.entity";
import { CharacterModel, ClassModel } from "../models/character.model";
import { convertSizeToEnum, convertToFlyingSpeed, buildSpeedConditions, buildResistances, buildImmunities, buildTraits, buildSpellcasting } from "./sharedConverters";

export function characterEntityToModelConverter(entity: CharacterEntity): CharacterModel {
    let model: CharacterModel = new CharacterModel(entity.id, entity.name);

    model.size = convertSizeToEnum(entity.size);
    model.level = entity.level;
    model.race = entity.race;
    model.classes = entity.classes.map(x => new ClassModel(x.name, x.level));
    model.proficiencyBonus = entity.profBonus;
    model.hitpointMaximum = entity.hp;
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
    model.skillProficiencies = entity.skill;
    model.savingThrowProficiencies = entity.save;
    model.passivePerception = entity.passive;
    model.resistances = buildResistances(entity.resist);
    model.immunities = buildImmunities(entity.immune, entity.conditionImmune);
    model.languages = entity.languages;
    model.traits = buildTraits(entity.trait);
    model.actions = buildTraits(entity.action);
    model.reactions = buildTraits(entity.reaction);
    model.spellcasting = buildSpellcasting(entity.spellcasting);

    return model;
};