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
}

export interface Hp {
    average: number;
    formula: string;
}

export interface Speed {
    walk: number;
    fly: number;
}

export interface Skill {
    perception: string;
}

export interface Trait {
    name: string;
    entries: string[];
}

export interface Action {
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

export interface CreatureEntity {
    name: string;
    _copy: Copy;
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
    skill: Skill;
    passive: number;
    languages: string[];
    cr: string;
    trait: Trait[];
    action: Action[];
    environment: string[];
    soundClip: SoundClip;
    languageTags: string[];
    damageTags: string[];
    miscTags: string[];
    hasToken: boolean;
    hasFluff: boolean;
    hasFluffImages: boolean;
}