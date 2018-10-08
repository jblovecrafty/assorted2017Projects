export class Stats {
  constructor(str, dex, con, int, wis, cha){
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
    this.cha = cha;
  }
}

export class Name {
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export class Traits {
    constructor(partOfNpc, descriptor){
        this.partOfNpc = partOfNpc;
        this.descriptor = descriptor;
      }
}

export class Personality {
    constructor(majorPersonalityTrait, minorPersonalityTrait, definingCharacteristic){
        this.majorPersonalityTrait = majorPersonalityTrait;
        this.minorPersonalityTrait = minorPersonalityTrait;
        this.definingCharacteristic = definingCharacteristic;
      }
}

export class Items {
    constructor(weapon, armor, commonItem, specialItem){
        this.weapon = weapon;
        this.armor = armor;
        this.commonItem = commonItem;
        this.specialItem = specialItem;
      }
}

export class Appearance {
    constructor(majorPhysicalTrait, minorPhysicalTrait){
        this.majorPhysicalTrait = majorPhysicalTrait;
        this.minorPhysicalTrait = minorPhysicalTrait;
      }
}

export class Character {
  constructor(stats, name, race, gender, alignment, level, characterClass, personality, items, appearance) {
    this.stats = stats;
    this.name = name;
    this.race = race;
    this.gender = gender;
    this.alignment = alignment;
    this.level = level;
    this.characterClass = characterClass;
    this.personality = personality;
    this.items = items;
    this.appearance = appearance;
  }
}

