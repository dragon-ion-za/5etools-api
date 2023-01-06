export interface OtherSource {
    source: string;
}

export interface Type {
    type: string;
    tags: string[];
}

export interface Ac {
    ac: number;
    from: string[];
    condition: string;
}

export interface Hp {
    average: number;
    formula: string;
    special: string;
}

export interface Speed {
    walk: number;
    climb: number;
    burrow: number;
    swim: number;
    fly: ComplexSpeed | number;
    canHover: boolean;
}

export interface ComplexSpeed {
    number: number;
    condition: string;
}

export interface Trait {
    name: string;
    entries: string[];
}

export interface SoundClip {
    type: string;
    path: string;
}

export interface Mod {
    trait: Trait;
}

export interface Copy {
    name: string;
    source: string;
    _mod: Mod;
}

export interface ComplexResist {
    special: string;
    resist: string[];
    note: string;
    cond: boolean;
}

export interface ComplexImmunity {
    special: string;
    immune: string[];
    note: string;
    cond: boolean;
}

export interface Spellcasting {
    name: string;
    headerEntries: string[];
    footerEntries: string[];
    spells: { [key: string] : KnownSpells };
    will: string[];
    daily: { [key: string] : string[] };
    ability: string;
    hidden: string[];
}

export interface KnownSpells {
    slots: number;
    spells: string[];
}

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
}