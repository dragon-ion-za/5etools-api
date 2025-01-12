import { Copy, OtherSource, Type, Ac, Hp, Speed, Trait, SoundClip, Spellcasting, LegendaryGroup, Save } from "./sharedEntities";

export interface CreatureEntity {
    name: string;
    _copy: Copy;
    _isCopy: boolean;
    source: string;
    page: number;
    otherSources: OtherSource[];
    size: string[];
    type: Type | string;
    alignment: string[];
    ac: Ac[] | number[];
    hp: Hp;
    speed: Speed;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
    skill: object;
    passive: number;
    languages: string[];
    cr: string;
    trait: Trait[];
    action: Trait[];
    reaction: Trait[];
    legendary: Trait[];
    legendaryActions: number;
    environment: string[];
    soundClip: SoundClip;
    languageTags: string[];
    damageTags: string[];
    miscTags: string[];
    hasToken: boolean;
    hasFluff: boolean;
    hasFluffImages: boolean;
    resist: object;
    immune: string[];
    conditionImmune: string[];
    spellcasting: Spellcasting[];
    legendaryGroup: LegendaryGroup | null;
    senses: string[];
    save: Save | null;
}