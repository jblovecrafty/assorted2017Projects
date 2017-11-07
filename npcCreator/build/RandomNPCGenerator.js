"use strict";
exports.__esModule = true;
var Character_1 = require("./Character");
var Character_2 = require("./Character");
var RandomNPCGenerator = (function () {
    function RandomNPCGenerator(npc) {
        this.raceList = [
            { race: "human", chance: .3, statMods: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 } },
            { race: "halfling", chance: .2, statMods: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 } },
            { race: "gnome", chance: .2, statMods: { str: 0, dex: 0, con: 0, int: 2, wis: 0, cha: 0 } },
            { race: "dwarf", chance: .25, statMods: { str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: 0 } },
            { race: "half orc", chance: .05, statMods: { str: 2, dex: 0, con: 0, int: 0, wis: 0, cha: 0 } }
        ];
        this.levelList = [
            { level: 0, chance: .15 },
            { level: 1, chance: .25 },
            { level: 2, chance: .25 },
            { level: 3, chance: .15 },
            { level: 4, chance: .1 },
            { level: 5, chance: .05 },
            { level: 6, chance: .05 },
        ];
        this.gender = [{ gender: "male", chance: .5 }, { gender: "female", chance: .5 }];
        this.maleHumanFirstNames = ["Anlow", "Arando", "Bram", "Cale", "Dalkon", "Daylen", "Dodd", "Dungarth", "Dyrk", "Eandro", "Falken", "Feck", "Fenton", "Gryphero", "Hagar", "Jeras", "Krynt", "Lavant", "Leyten", "Madian", "Malfier", "Markus", "Meklan", "Namen", "Navaren", "Nerle", "Nilus", "Ningyan", "Norris", "Quentin", "Semil", "Sevenson", "Steveren", "Talfen", "Tamond", "Taran", "Tavon", "Tegan", "Vanan", "Vincent"];
        this.femaleHumanFirstNames = ["Azura", "Brey", "Hallan", "Kasaki", "Lorelei", "Mirabel", "Pharana", "Remora", "Rosalyn", "Sachil", "Saidi", "Tanika", "Tura", "Tylsa", "Vencia", "Xandrilla"];
        this.humanLastName = ["Arkalis", "Armanci", "Bilger", "Blackstrand", "Brightwater", "Carnavon", "Caskajaro", "Coldshore", "Coyle", "Cresthill", "Cuttlescar", "Daargen", "Dalicarlia", "Danamark", "Donoghan", "Drumwind", "Dunhall", "Ereghast", "Falck", "Fallenbridge", "Faringray", "Fletcher", "Fryft", "Goldrudder", "Grantham", "Graylock", "Gullscream", "Hindergrass", "Iscalon", "Kreel", "Kroft", "Lamoth", "Leerstrom", "Lynchfield", "Moonridge", "Netheridge", "Oakenheart", "Pyncion", "Ratley", "Redraven", "Revenmar", "Roxley", "Sell", "Seratolva", "Shanks", "Shattermast", "Shaulfer", "Silvergraft", "Stavenger", "Stormchapel", "Strong", "Swiller", "Talandro ", "Targana", "Towerfall", "Umbermoor", "Van Devries", "Van Gandt", "Van Hyden", "Varcona", "Varzand", "Voortham", "Vrye", "Webb", "Welfer", "Wilxes", "Wintermere", "Wygarthe", "Zatchet", "Zethergyll"];
        this.maleHaflingFirstNames = ["Arthan", "Carvin", "Corby", "Cullen", "Egen", "Ernest", "Gedi", "Heron", "Jeryl", "Keffen", "Kylem", "Kynt", "Leskyn", "Neff", "Orne", "Quarrel", "Rabbit", "Rilkin", "Snakebait", "Tarfen", "Titch", "Tuck", "Whim"];
        this.femaleHalflingFirstNames = ["Caliope", "Emily", "Piper", "Rixi", "Sabretha", "Teg", "Tilly", "Toira", "Vexia", "Vil", "Vzani", "Zanthe", "Ziza"];
        this.halflingLastNames = ["Angler", "Battlestone", "Blackwater", "Daggersharp", "Deepstrider", "Hollowpot", "Puddle", "Raftmite", "Skiprock", "Silverfin", "Tanglestrand", "Tricker", "Willowrush", "Yellowcrane"];
        this.maleDwarfFirstNames = ["Agaro", "Arnan", "Auxlan", "Avamir", "Baelnar", "Balfam", "Bariken", "Borkûl", "Darkûl", "Dolmen", "Dyrnar", "Erag", "Ezegan", "Ferrek", "Garmûl", "Glint", "Ghorvas", "Grimmalk", "Haeltar", "Halagmar", "Halzar", "Hlant", "Korlag", "Krag", "Krim", "Kurman", "Lurtrum", "Malagar", "Mardam", "Maulnar", "Melgar", "Morak", "Orobok", "Rogath", "Roken", "Rozag", "Sabakzar", "Sharak", "Smethykk", "Swargar", "Thorbalt", "Thorin", "Tredigar", "Vabûl", "Vistrum", "Wolvar"];
        this.femaleDwarfFirstNames = ["Beyla", "Fenryl", "Grenenzel", "Krystolari", "Lokara", "Lurka", "Marnia", "Praxana", "Rokel", "Roksana", "Thurlfara", "Vauldra", "Veklani", "Vronwe", "Zebel"];
        this.dwarfLastNames = ["Ambershard", "Barrelhelm", "Copperhearth", "Deepmiddens", "Drakantal", "Evermead", "Garkalan", "Grimtor", "Hackshield", "Irongull", "Markolak", "Ramcrown", "Rockharvest", "Silvertarn", "Skandalor", "Zarkanan"];
        this.gnomeMaleFirstNames = ["Annikko", "Aolor", "Apnee", "Arn", "Balto", "Birzoon", "Bramo", "Burgell", "Cline", "Colmarr", "Crayloon", "Cuirboly", "Dak", "Dorgan", "Eckel", "Ensu", "Erb", "Erkenwald", "Falrinn", "Furduch", "Gormadoc", "Gostegottl", "Gundigoot", "Gwaylar", "Halanan", "Halbrinn", "Hallap", "Hamarka", "Hensu", "Hewett", "Hoch", "Hoose", "Igsenki", "Ikitur", "Jaroo", "Juutar", "Kantelleki", "Kutar", "Kyliki", "Lakajan", "Larimo", "Lelmose", "Lotch", "Lynen", "Malesacar", "Miep", "Mirge", "Moczama", "Myroc", "Nebin", "Nizam", "Noj", "Norbor", "Notar", "Nuados", "Orlamm", "Osomo", "Oyun", "Pello", "Piletti", "Pinker", "Poot", "Quonzar", "Ramne", "Redef", "Rondell", "Sahir", "Samoinan", "Sahtwyrn", "Spah", "Spugnor", "Stolig", "Suram", "Swa", "Tahir", "Tamatar", "Tamoinen", "Thrang", "Uani", "Uli", "Unferth", "Unqin", "Verhoo", "Veter", "Vlodge", "Voynan", "Wilf", "Yarol", "Yipwyg", "Zupesh", "Zygur"];
        this.gnomeFemaleFirstNames = ["Ahtva", "Bitha", "Calanddra", "Cirilli", "Eriss", "Finla", "Iviss", "Jaree", "Kasma", "Lissa", "Meree", "Nathee", "Penabwa", "Tamora", "Zelazadda"];
        this.gnomeLastNames = ["Abren", "Aelnor", "Bachin", "Banilor", "Blackrock", "Blimth", "Danask", "Durim", "Fasketel", "Furnak", "Galeb", "Greatorm", "Grosko", "Hardin", "Hymnir", "Jarnak", "Kellen", "Kyri", "Lundor", "Merren", "Nessik", "Pernor", "Quindal", "Ranadal", "Rivenstone", "Rustek", "Rutvor", "Sasken", "Shasto", "Skerrit", "Tamble", "Tavartarr", "Terrick", "Turco", "Urvor", "Uvarkk", "Vandek", "Vilio", "Walnir", "Whitehorn", "Yimble"];
        this.halfOrcMaleFirstNames = ["Boronur", "Sarurash", "Hagenar", "Mugudurk", "Ganatir", "Soromar", "Muraarim", "Haguz", "Asodall", "Urtrosk"];
        this.halfOrcFemaleFirstNames = ["Aragri", "Shayazura", "Karug", "Shemur", "Semotar", "Alanar", "Zanagur", "Temosh", "Tuome", "Temogum"];
        this.halfOrcLastNames = ["the Mad", "Skull Taker", "Eater of Foes", "the Lost", "of the North", "Blunt Blade", "the Crafty", "Night Haunter", "Drinker of Blood", "Breaker of Bones", "the Sword Cleaver"];
        this.statProbability = [
            { number: 3, chance: 0.0049 },
            { number: 4, chance: 0.0138 },
            { number: 5, chance: 0.0277 },
            { number: 6, chance: 0.0462 },
            { number: 7, chance: 0.0694 },
            { number: 8, chance: 0.0972 },
            { number: 9, chance: 0.1157 },
            { number: 10, chance: 0.1251 },
            { number: 11, chance: 0.1251 },
            { number: 12, chance: 0.1157 },
            { number: 13, chance: 0.0972 },
            { number: 14, chance: 0.0694 },
            { number: 15, chance: 0.0462 },
            { number: 16, chance: 0.0277 },
            { number: 17, chance: 0.0138 },
            { number: 18, chance: 0.0049 },
        ];
        this.classes = [
            { "class": "Barbarian", chance: 0.05 },
            { "class": "Bard", chance: 0.10 },
            { "class": "Cleric", chance: 0.05 },
            { "class": "Druid", chance: 0.05 },
            { "class": "Fighter", chance: 0.20 },
            { "class": "Monk", chance: 0.025 },
            { "class": "Paladin", chance: 0.025 },
            { "class": "Ranger", chance: 0.10 },
            { "class": "Rogue", chance: 0.15 },
            { "class": "Sorcerer", chance: 0.05 },
            { "class": "Warlock", chance: 0.05 },
            { "class": "Wizard", chance: 0.15 }
        ];
        this.alignment = [
            { alignment: "Lawful good", chance: 0.025 },
            { alignment: "Neutral good", chance: 0.20 },
            { alignment: "Chaotic good", chance: 0.20 },
            { alignment: "Lawful neutral", chance: 0.10 },
            { alignment: "neutral", chance: 0.20 },
            { alignment: "Chaotic neutral", chance: 0.20 },
            { alignment: "Lawful evil", chance: 0.025 },
            { alignment: "Neutral evil", chance: 0.025 },
            { alignment: "Chaotic evil", chance: 0.025 },
        ];
        this.npc = npc;
    }
    RandomNPCGenerator.prototype.calculateAccumulatedChance = function (arrayOfChances) {
        var currentPercentage = 0;
        arrayOfChances.forEach(function (element) {
            currentPercentage += element.chance;
            element.calculatedChance = currentPercentage;
        });
    };
    RandomNPCGenerator.prototype.chancePicker = function (arrayOfItems) {
        var percentage = Math.random();
        this.calculateAccumulatedChance(arrayOfItems);
        for (var i = 0; i < arrayOfItems.length; i++) {
            if (arrayOfItems[i].calculatedChance >= percentage) {
                return arrayOfItems[i];
            }
        }
    };
    RandomNPCGenerator.prototype.namePicker = function (race, gender) {
        var nameObject = new Character_2.Name();
        function nameBuilder(maleFirstName, femaleFirstName, lastName) {
            if (gender == "male") {
                nameObject.firstName = maleFirstName[Math.floor(Math.random() * maleFirstName.length)];
            }
            else {
                nameObject.firstName = femaleFirstName[Math.floor(Math.random() * femaleFirstName.length)];
            }
            nameObject.lastName = lastName[Math.floor(Math.random() * lastName.length)];
        }
        switch (race) {
            case "human":
                nameBuilder(this.maleHumanFirstNames, this.femaleHumanFirstNames, this.humanLastName);
                break;
            case "halfling":
                nameBuilder(this.maleHaflingFirstNames, this.femaleHalflingFirstNames, this.halflingLastNames);
                break;
            case "gnome":
                nameBuilder(this.gnomeMaleFirstNames, this.gnomeFemaleFirstNames, this.gnomeLastNames);
                break;
            case "dwarf":
                nameBuilder(this.maleDwarfFirstNames, this.femaleDwarfFirstNames, this.dwarfLastNames);
                break;
            case "half orc":
                nameBuilder(this.halfOrcMaleFirstNames, this.halfOrcFemaleFirstNames, this.halfOrcLastNames);
                break;
        }
        return nameObject;
    };
    RandomNPCGenerator.prototype.statBlockBuilder = function (raceStatMods) {
        var stats = new Character_1.Stats();
        for (var _i = 0, _a = Object.keys(stats); _i < _a.length; _i++) {
            var key = _a[_i];
            stats[key] = this.chancePicker(this.statProbability).number;
        }
        for (var _b = 0, _c = Object.keys(raceStatMods); _b < _c.length; _b++) {
            var key = _c[_b];
            stats[key] += raceStatMods[key];
        }
        return stats;
    };
    RandomNPCGenerator.prototype.generateNPC = function () {
        var race = this.chancePicker(this.raceList);
        this.npc.race = race.race;
        this.npc.gender = this.chancePicker(this.gender).gender;
        var name = this.namePicker(race.race, this.npc.gender);
        this.npc.firstName = name.firstName;
        this.npc.lastName = name.lastName;
        this.npc.alignment = this.chancePicker(this.alignment).alignment;
        var stats = this.statBlockBuilder(race.statMods);
        this.npc.stats.cha = stats.cha;
        this.npc.stats.con = stats.con;
        this.npc.stats.dex = stats.dex;
        this.npc.stats.int = stats.int;
        this.npc.stats.str = stats.str;
        this.npc.stats.wis = stats.wis;
        this.npc.level = this.chancePicker(this.levelList).level;
        this.npc["class"] = this.chancePicker(this.classes)["class"];
        return this.npc;
    };
    return RandomNPCGenerator;
}());
exports.RandomNPCGenerator = RandomNPCGenerator;
//# sourceMappingURL=RandomNPCGenerator.js.map