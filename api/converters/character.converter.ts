import { CharacterEntity } from "../entities/character.entity";
import { ItemEntity } from "../entities/item.entity";
import { CharacterModel, ClassModel } from "../models/character.model";
import { ItemModel } from "../models/item.model";
import { itemEntityToModelConverter } from "./item.converter";
import { convertSizeToEnum, convertToFlyingSpeed, buildSpeedConditions, buildResistances, buildImmunities, buildTraits, buildSpellcasting, buildActionGroupActionsFromTraits, buildActionGroupActionsFromSpellcasting } from "./sharedConverters";

function buildEquipment(equipment: string[], allItems: ItemEntity[]): ItemModel[] {
    let equippedItems: ItemModel[] = [];

    equipment.forEach((itemName) => {
        let item: ItemEntity = allItems.filter(x => x.name === itemName)[0];

        if (item) {
            equippedItems.push(itemEntityToModelConverter(item));
        }
    });

    return equippedItems;
}

export function characterEntityToModelConverter(entity: CharacterEntity, allItems: ItemEntity[]): CharacterModel {
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
    model.languages = entity.languages ?? [];
    model.traits = buildTraits(entity.trait);
    model.actions = buildTraits(entity.action);
    model.reactions = buildTraits(entity.reaction);
    model.spellcasting = buildSpellcasting(entity.spellcasting);
    model.equipment = buildEquipment(entity.equipment, allItems);
    model.senses = entity.senses ?? [];

    model.actionGroups.push(buildActionGroupActionsFromTraits('Traits', entity.trait ?? []));
    model.actionGroups.push(buildActionGroupActionsFromTraits('Actions', entity.action ?? []));
    model.actionGroups.push(buildActionGroupActionsFromTraits('Reactions', entity.reaction ?? []));

    if (entity.spellcasting && entity.spellcasting.length > 0) {
        model.actionGroups.push(buildActionGroupActionsFromSpellcasting('Spellcasting', entity.spellcasting.filter(x => x.name === 'Spellcasting')[0]));
        model.actionGroups.push(buildActionGroupActionsFromSpellcasting('Innate Spellcasting', entity.spellcasting.filter(x => x.name === 'Innate Spellcasting')[0]));
    }

    return model;
};