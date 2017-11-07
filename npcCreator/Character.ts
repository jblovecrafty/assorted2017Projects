export class Stats { 
    str: number; 
    dex: number;
    con: number; 
    int: number; 
    wis: number; 
    cha: number;
 };

 export class Name { 
    firstName: string;
    lastName: string;
};

export class Character {
    race: string;
    gender: string;
    firstName: string;
    lastName: string;
    alignment: string;
    class: string;

    stats: Stats;
    level: number;
}