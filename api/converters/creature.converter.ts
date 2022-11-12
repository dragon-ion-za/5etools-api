import { Ac, CreatureEntity, Type } from "../entities/creature.entity";
import { ArmourClassModel, CreatureModel, CreatureSizes } from "../models/creature.model";

export function creatureEntityToModelConverter(entity: CreatureEntity): CreatureModel {
    let model: CreatureModel = new CreatureModel(entity.name);

    model.sourceId = entity.source;
    model.size = convertSizeToEnum(entity.size);
    model.type = (entity.type as Type)?.type ?? entity.type as string;
    model.alignment = entity.alignment;
    model.armourClass = convertToArmourClassModel(entity.ac);

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
    let acArray: Ac[] = entityAc as Ac[];

    if (!acArray) {
        return new ArmourClassModel((entityAc as number[])[0], '');
    } else {
        return new ArmourClassModel(acArray[0].ac, acArray[0].from[0] ?? '');
    }
}