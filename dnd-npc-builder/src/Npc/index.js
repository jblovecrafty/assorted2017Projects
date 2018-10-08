import { Character } from "../Character";
import { Stats } from "../Character";
import { Name } from "../Character";
import { Personality } from "../Character";
import { Appearance } from "../Character";
import { Items } from "../Character";

export class RandomNPCGenerator {  
    constructor(npc) {
        this.npc = npc;
    }

    raceList = [
        { race: "human", chance: .3, statMods: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 } },
        { race: "halfling", chance: .2, statMods: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 } },
        { race: "gnome", chance: .2, statMods: { str: 0, dex: 0, con: 0, int: 2, wis: 0, cha: 0 } },
        { race: "dwarf", chance: .25, statMods: { str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: 0 } },
        { race: "half orc", chance: .05, statMods: { str: 2, dex: 0, con: 0, int: 0, wis: 0, cha: 0 } }
    ];
    
    levelList = [
        { level: 0, chance: .15 },
        { level: 1, chance: .25 },
        { level: 2, chance: .25 },
        { level: 3, chance: .15 },
        { level: 4, chance: .1 },
        { level: 5, chance: .05 },
        { level: 6, chance: .05 },
    ];
    
    gender = [{ gender: "male", chance: .5 }, { gender: "female", chance: .5 }];
    
    //source for names http://brandondraga.tumblr.com/post/66804468075/chris-perkins-npc-name-list
    maleHumanFirstNames = ["Anlow", "Arando", "Bram", "Cale", "Dalkon", "Daylen", "Dodd", "Dungarth", "Dyrk", "Eandro", "Falken", "Feck", "Fenton", "Gryphero", "Hagar", "Jeras", "Krynt", "Lavant", "Leyten", "Madian", "Malfier", "Markus", "Meklan", "Namen", "Navaren", "Nerle", "Nilus", "Ningyan", "Norris", "Quentin", "Semil", "Sevenson", "Steveren", "Talfen", "Tamond", "Taran", "Tavon", "Tegan", "Vanan", "Vincent"];
    femaleHumanFirstNames = ["Azura", "Brey", "Hallan", "Kasaki", "Lorelei", "Mirabel", "Pharana", "Remora", "Rosalyn", "Sachil", "Saidi", "Tanika", "Tura", "Tylsa", "Vencia", "Xandrilla"];
    humanLastName = ["Arkalis", "Armanci", "Bilger", "Blackstrand", "Brightwater", "Carnavon", "Caskajaro", "Coldshore", "Coyle", "Cresthill", "Cuttlescar", "Daargen", "Dalicarlia", "Danamark", "Donoghan", "Drumwind", "Dunhall", "Ereghast", "Falck", "Fallenbridge", "Faringray", "Fletcher", "Fryft", "Goldrudder", "Grantham", "Graylock", "Gullscream", "Hindergrass", "Iscalon", "Kreel", "Kroft", "Lamoth", "Leerstrom", "Lynchfield", "Moonridge", "Netheridge", "Oakenheart", "Pyncion", "Ratley", "Redraven", "Revenmar", "Roxley", "Sell", "Seratolva", "Shanks", "Shattermast", "Shaulfer", "Silvergraft", "Stavenger", "Stormchapel", "Strong", "Swiller", "Talandro ", "Targana", "Towerfall", "Umbermoor", "Van Devries", "Van Gandt", "Van Hyden", "Varcona", "Varzand", "Voortham", "Vrye", "Webb", "Welfer", "Wilxes", "Wintermere", "Wygarthe", "Zatchet", "Zethergyll"];
    
    maleHaflingFirstNames = ["Arthan", "Carvin", "Corby", "Cullen", "Egen", "Ernest", "Gedi", "Heron", "Jeryl", "Keffen", "Kylem", "Kynt", "Leskyn", "Neff", "Orne", "Quarrel", "Rabbit", "Rilkin", "Snakebait", "Tarfen", "Titch", "Tuck", "Whim"];
    femaleHalflingFirstNames = ["Caliope", "Emily", "Piper", "Rixi", "Sabretha", "Teg", "Tilly", "Toira", "Vexia", "Vil", "Vzani", "Zanthe", "Ziza"];
    halflingLastNames = ["Angler", "Battlestone", "Blackwater", "Daggersharp", "Deepstrider", "Hollowpot", "Puddle", "Raftmite", "Skiprock", "Silverfin", "Tanglestrand", "Tricker", "Willowrush", "Yellowcrane"];
    
    maleDwarfFirstNames = ["Agaro", "Arnan", "Auxlan", "Avamir", "Baelnar", "Balfam", "Bariken", "Borkûl", "Darkûl", "Dolmen", "Dyrnar", "Erag", "Ezegan", "Ferrek", "Garmûl", "Glint", "Ghorvas", "Grimmalk", "Haeltar", "Halagmar", "Halzar", "Hlant", "Korlag", "Krag", "Krim", "Kurman", "Lurtrum", "Malagar", "Mardam", "Maulnar", "Melgar", "Morak", "Orobok", "Rogath", "Roken", "Rozag", "Sabakzar", "Sharak", "Smethykk", "Swargar", "Thorbalt", "Thorin", "Tredigar", "Vabûl", "Vistrum", "Wolvar"];
    femaleDwarfFirstNames = ["Beyla", "Fenryl", "Grenenzel", "Krystolari", "Lokara", "Lurka", "Marnia", "Praxana", "Rokel", "Roksana", "Thurlfara", "Vauldra", "Veklani", "Vronwe", "Zebel"];
    dwarfLastNames = ["Ambershard", "Barrelhelm", "Copperhearth", "Deepmiddens", "Drakantal", "Evermead", "Garkalan", "Grimtor", "Hackshield", "Irongull", "Markolak", "Ramcrown", "Rockharvest", "Silvertarn", "Skandalor", "Zarkanan"];
    
    //source for names https://xaeyruudh.wordpress.com/2012/04/16/gnomish-names/
    gnomeMaleFirstNames = ["Annikko", "Aolor", "Apnee", "Arn", "Balto", "Birzoon", "Bramo", "Burgell", "Cline", "Colmarr", "Crayloon", "Cuirboly", "Dak", "Dorgan", "Eckel", "Ensu", "Erb", "Erkenwald", "Falrinn", "Furduch", "Gormadoc", "Gostegottl", "Gundigoot", "Gwaylar", "Halanan", "Halbrinn", "Hallap", "Hamarka", "Hensu", "Hewett", "Hoch", "Hoose", "Igsenki", "Ikitur", "Jaroo", "Juutar", "Kantelleki", "Kutar", "Kyliki", "Lakajan", "Larimo", "Lelmose", "Lotch", "Lynen", "Malesacar", "Miep", "Mirge", "Moczama", "Myroc", "Nebin", "Nizam", "Noj", "Norbor", "Notar", "Nuados", "Orlamm", "Osomo", "Oyun", "Pello", "Piletti", "Pinker", "Poot", "Quonzar", "Ramne", "Redef", "Rondell", "Sahir", "Samoinan", "Sahtwyrn", "Spah", "Spugnor", "Stolig", "Suram", "Swa", "Tahir", "Tamatar", "Tamoinen", "Thrang", "Uani", "Uli", "Unferth", "Unqin", "Verhoo", "Veter", "Vlodge", "Voynan", "Wilf", "Yarol", "Yipwyg", "Zupesh", "Zygur"];
    gnomeFemaleFirstNames = ["Ahtva", "Bitha", "Calanddra", "Cirilli", "Eriss", "Finla", "Iviss", "Jaree", "Kasma", "Lissa", "Meree", "Nathee", "Penabwa", "Tamora", "Zelazadda"];
    gnomeLastNames = ["Abren", "Aelnor", "Bachin", "Banilor", "Blackrock", "Blimth", "Danask", "Durim", "Fasketel", "Furnak", "Galeb", "Greatorm", "Grosko", "Hardin", "Hymnir", "Jarnak", "Kellen", "Kyri", "Lundor", "Merren", "Nessik", "Pernor", "Quindal", "Ranadal", "Rivenstone", "Rustek", "Rutvor", "Sasken", "Shasto", "Skerrit", "Tamble", "Tavartarr", "Terrick", "Turco", "Urvor", "Uvarkk", "Vandek", "Vilio", "Walnir", "Whitehorn", "Yimble"];
    
    //souce for names http://www.fantasynamegenerators.com/dnd-half-orc-names.php
    halfOrcMaleFirstNames = ["Boronur", "Sarurash", "Hagenar", "Mugudurk", "Ganatir", "Soromar", "Muraarim", "Haguz", "Asodall", "Urtrosk"];
    halfOrcFemaleFirstNames = ["Aragri", "Shayazura", "Karug", "Shemur", "Semotar", "Alanar", "Zanagur", "Temosh", "Tuome", "Temogum"];
    halfOrcLastNames = ["the Mad", "Skull Taker", "Eater of Foes", "the Lost", "of the North", "Blunt Blade", "the Crafty", "Night Haunter", "Drinker of Blood", "Breaker of Bones", "the Sword Cleaver"];

    statProbability = [
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
    
    classes = [
        { class: "Barbarian", chance: 0.025 },
        { class: "Bard", chance: 0.05 },
        { class: "Cleric", chance: 0.05 },
        { class: "Druid", chance: 0.05 },
        { class: "Fighter", chance: 0.05 },
        { class: "Monk", chance: 0.025 },
        { class: "Paladin", chance: 0.025 },
        { class: "Ranger", chance: 0.05 },
        { class: "Rogue", chance: 0.10 },
        { class: "Sorcerer", chance: 0.05 },
        { class: "Warlock", chance: 0.05 },
        { class: "Wizard", chance: 0.05 },
        { class: "Merchant", chance: 0.05 },
        { class: "Clergy", chance: 0.05 },
        { class: "Artisan", chance: 0.10 },
        { class: "Laborer", chance: 0.10 },
        { class: "Worker", chance: 0.10 },
        { class: "Criminal", chance: 0.05 },
        { class: "Noble", chance: 0.025 },
    ];
    
    alignment = [
        { alignment: "Lawful Good", chance: 0.025 },
        { alignment: "Neutral Good", chance: 0.20 },
        { alignment: "Chaotic Good", chance: 0.20 },
        { alignment: "Lawful Neutral", chance: 0.10 },
        { alignment: "Neutral", chance: 0.20 },
        { alignment: "Chaotic Neutral", chance: 0.20 },
        { alignment: "Lawful Evil", chance: 0.025 },
        { alignment: "Neutral Evil", chance: 0.025 },
        { alignment: "Chaotic Evil", chance: 0.025 },
    ];

    //some taken from https://nerdsonearth.com/2015/03/npc-personality-traits-dnd-5e/
    physicalTraits = [
        {
            partOfNpc: "Hair", 
            descriptors: [
            "Bushy Sideburns",
            "Scraggly Beard",
            "Braided Hair",
            "Shaved head",
            "Patchy hair",
            "Obviously wearing a wig",
            "Limp hair",
            "Curled hair",
            "Oily hair"
        ]},
        {
            partOfNpc: "Nose",
            descriptors: [
                "Runny nose",
                "Long nose",
                "Short nose",
                "Missing nose",
                "Metallic nose",
                "Broken nose"
            ]
        }
        ,
        {
            partOfNpc: "Limbs",
            descriptors: [
                "Missing a Finger",
                "Limping",
                "Long fingernails",
                "Chewed fingernails",
                "Walks with a cane",
                "Missing Limb",
                "Mechanical Limb",
                "Hands covered in colored dye"
            ]
        }
        ,
        {
            partOfNpc: "Face",
            descriptors: [
                "Noticeably Crooked Teeth",
                "Scar from an Animal Attack",
                "Hooded Eyes",
                "Pock Marked",
                "Birthmark",
                "Jowls",
                "Bulging Eyes",
                "Eye patch",
                "Single Scar across face",
                "Thin eyebrows",
                "Bushy eyebrows",
            ]
        },
        {
            partOfNpc: "Overall",
            descriptors: [
                "Freckled",
                "Pale",
                "Stout",
                "Well Dressed",
                "Food Stained Clothing",
                "Heavily Perfumed",
                "Cough",
                "Carefully mended clothes",
                "Pattern of Tiny Scars",
                "Strong jaw",
                "Has slight tremors",
                "Wears long leather gloves",
                "Thin",
                "Constantly itching",
                "Wears tons of cheap looking jewelery",
                "Wears too warm or not enough clothes depending on the weather",
                "Tatoos",
                "Smells of sulphur",
                "Unwashed",
                "Beautiful",
                "Multiple piercings"
            ]
        }
    ]

    // source http://scott.maclure.info/character-traits/traits-G.json
    basicPersonalityTraits = [
        "Accusative",
		"Active",
		"Adventurous",
		"Affable",
		"Aggressive",
		"Agreeable",
		"Aimless",
		"Aloof",
		"Altruistic",
		"Analytical",
		"Angry",
		"Animated",
		"Annoying",
		"Anxious",
		"Apathetic",
		"Apologetic",
		"Apprehensive",
		"Argumentative",
		"Arrogant",
		"Articulate",
		"Attentive",
		"Bigoted",
		"Bitter",
		"Blustering",
		"Boastful",
		"Bookish",
		"Bossy",
		"Braggart",
		"Brash",
		"Brave",
		"Bullying",
		"Callous",
		"Calm",
		"Candid",
		"Cantankerous",
		"Capricious",
		"Careful",
		"Careless",
		"Caring",
		"Casual",
		"Catty",
		"Cautious",
		"Cavalier",
		"Charming",
		"Chaste",
		"Chauvinistic",
		"Cheeky",
		"Cheerful",
		"Childish",
		"Chivalrous",
		"Clueless",
		"Clumsy",
		"Cocky",
		"Comforting",
		"Communicative",
		"Complacent",
		"Condescending",
		"Confident",
		"Conformist",
		"Confused",
		"Conscientious",
		"Conservative",
		"Contentious",
		"Contrary",
		"Contumely",
		"Conventional",
		"Cooperative",
		"Courageous",
		"Courteous",
		"Cowardly",
		"Coy",
		"Crabby",
		"Cranky",
		"Critical",
		"Cruel",
		"Cultured",
		"Curious",
		"Cynical",
		"Daring",
		"Deceitful",
		"Deceptive",
		"Defensive",
		"Defiant",
		"Deliberate",
		"Deluded",
		"Depraved",
		"Discreet",
		"Dishonest",
		"Disingenuous",
		"Disloyal",
		"Disrespectful",
		"Distant",
		"Distracted",
		"Distraught",
		"Docile",
		"Doleful",
		"Dominating",
		"Dramatic",
		"Drunkard",
		"Dull",
		"Earthy",
		"Eccentric",
		"Elitist",
		"Emotional",
		"Energetic",
		"Enigmatic",
		"Enthusiastic",
		"Epicurean",
		"Excited",
		"Expressive",
		"Extroverted",
		"Faithful",
		"Fanatical",
		"Fastidious",
		"Fatalistic",
		"Fearful",
		"Fearless",
		"Feral",
		"Fierce",
		"Feisty",
		"Flamboyant",
		"Flippant",
		"Flirtatious",
		"Foolhardy",
		"Foppish",
		"Forgiving",
		"Friendly",
		"Frightened",
		"Frivolous",
		"Frustrated",
		"Funny",
		"Furtive",
		"Generous",
		"Genial",
		"Gentle",
		"Gloomy",
		"Goofy",
		"Gossip",
		"Graceful",
		"Gracious",
		"Grave",
		"Gregarious",
		"Grouchy",
		"Groveling",
		"Gruff",
		"Gullible",
		"Happy",
		"Harsh",
		"Hateful",
		"Helpful",
		"Honest",
		"Hopeful",
		"Hostile",
		"Humble",
		"Humorless",
		"Humorous",
		"Idealistic",
		"Idiosyncratic",
		"Imaginative",
		"Imitative",
		"Impatient",
		"Impetuous",
		"Implacable",
		"Impractical",
		"Impulsive",
		"Inattentive",
		"Incoherent",
		"Indifferent",
		"Indiscreet",
		"Individualist",
		"Indolent",
		"Indomitable",
		"Industrious",
		"Inexorable",
		"Inexpressive",
		"Insecure",
		"Insensitive",
		"Instructive",
		"Intolerant",
		"Intransigent",
		"Introverted",
		"Irreligious",
		"Irresponsible",
		"Irreverent",
		"Irritable",
		"Jealous",
		"Jocular",
		"Joking",
		"Jolly",
		"Joyous",
		"Judgmental",
		"Jumpy",
		"Kind",
		"Know-it-all",
		"Languid",
		"Lazy",
		"Lethargic",
		"Lewd",
		"Liar",
		"Likable",
		"Lippy",
		"Listless",
		"Loquacious",
		"Loving",
		"Loyal",
		"Lust",
		"Madcap",
		"Magnanimous",
		"Malicious",
		"Maudlin",
		"Mean",
		"Meddlesome",
		"Melancholy",
		"Melodramatic",
		"Merciless",
		"Merry",
		"Meticulous",
		"Mischievous",
		"Miscreant",
		"Miserly",
		"Modest",
		"Moody",
		"Moralistic",
		"Morbid",
		"Morose",
		"Mournful",
		"Mousy",
		"Mouthy",
		"Mysterious",
		"Naïve",
		"Narrow-minded",
		"Needy",
		"Nefarious",
		"Nervous",
		"Nettlesome",
		"Neurotic",
		"Noble",
		"Nonchalant",
		"Nurturing",
		"Obdurate",
		"Obedient",
		"Oblivious",
		"Obnoxious",
		"Obsequious",
		"Obsessive",
		"Obstinate",
		"Obtuse",
		"Odd",
		"Ornery",
		"Optimistic",
		"Organized",
		"Ostentatious",
		"Outgoing",
		"Overbearing",
		"Paranoid",
		"Passionate",
		"Pathological",
		"Patient",
		"Peaceful",
		"Pensive",
		"Pertinacious",
		"Pessimistic",
		"Philanderer",
		"Philosophical",
		"Phony",
		"Pious",
		"Playful",
		"Pleasant",
		"Poised",
		"Polite",
		"Pompous",
		"Pondering",
		"Pontificating",
		"Practical",
		"Prejudiced",
		"Pretentious",
		"Preoccupied",
		"Promiscuous",
		"Proper",
		"Proselytizing",
		"Proud",
		"Prudent",
		"Prudish",
		"Prying",
		"Puerile",
		"Pugnacious",
		"Quiet",
		"Quirky",
		"Racist",
		"Rascal",
		"Rash",
		"Realistic",
		"Rebellious",
		"Reckless",
		"Refined",
		"Repellent",
		"Reserved",
		"Respectful",
		"Responsible",
		"Restless",
		"Reticent",
		"Reverent",
		"Rigid",
		"Risk-taking",
		"Rude",
		"Sadistic",
		"Sarcastic",
		"Sardonic",
		"Sassy",
		"Savage",
		"Scared",
		"Scolding",
		"Secretive",
		"Self-effacing",
		"Selfish",
		"Selfless",
		"Senile",
		"Sensible",
		"Sensitive",
		"Sensual",
		"Sentimental",
		"Serene",
		"Serious",
		"Servile",
		"Sexist",
		"Sexual",
		"Shallow",
		"Shameful",
		"Shameless",
		"Shifty",
		"Shrewd",
		"Shy",
		"Sincere",
		"Slanderous",
		"Sly",
		"Smug",
		"Snobbish",
		"Sober",
		"Sociable",
		"Solemn",
		"Solicitous",
		"Solitary",
		"Sophisticated",
		"Spendthrift",
		"Spiteful",
		"Stern",
		"Stingy",
		"Stoic",
		"Stubborn",
		"Submissive",
		"Sultry",
		"Superstitious",
		"Surly",
		"Suspicious",
		"Sybarite",
		"Sycophantic",
		"Sympathetic",
		"Taciturn",
		"Tactful",
		"Tawdry",
		"Teetotaler",
		"Temperamental",
		"Tempestuous",
		"Thorough",
		"Thrifty",
		"Timid",
		"Tolerant",
		"Transparent",
		"Treacherous",
		"Troublemaker",
		"Trusting",
		"Truthful",
		"Uncommitted",
		"Understanding",
		"Unfriendly",
		"Unhinged",
		"Uninhibited",
		"Unpredictable",
		"Unruly",
		"Unsupportive",
		"Vague",
		"Vain",
		"Vapid",
		"Vengeful",
		"Vigilant",
		"Violent",
		"Vivacious",
		"Vulgar",
		"Wanton",
		"Wasteful",
		"Weary",
		"Whimsical",
		"Whiny",
		"Wicked",
		"Wisecracking",
		"Wistful",
		"Witty",
		"Zealous"
    ]

    // organizational ideas and descriptors from http://strolen.com/viewing/NPC_Characteristics
    personalityTraits = [
        {
            partOfNpc: "Verbal",
            descriptors: [
                "Keeps unsuccessfully trying to make jokes about dead animals.",
                "Curses often and apologizes each time.",
                "Comes close and puts their hands on those they talk to.",
                "Flips a coin and checks how it lands before answering questions.",
                "Answers every question with another question, thinking they're clever.",
                "Loses track of the conversation as if bored.",
                "Doesn't understand anything explained to them.",
                "Puts out his hand for some coin if any question is asked.",
                "Agrees with anything the players say.",
                "Has conversations with themself.",
                "Makes odd random noises.",
                "Talks in a whisper.",
                "Calls everyone Skipper. Chappy. Cap'n. Lala.",
                "Sings the sentences.",
                "Giggles when he/she hears random words, saying 'That's dirty!'",
                "Cannot correctly pronounce a party member's name, no matter how many times it's explained to them.",
                "Can't stand being asked the same question three times.",
                "Talks with a dead relative or friend.",
                "Startlingly begins to shout in MIDDLE OF THE SENTENCE",
                "Mutters or mouths words to him/herself after he/she is done speaking.",
                "Pops pimples and zits in the midst of conversation.",
                "Speaks with brevity, all sentences are as short as possible.",
                "Compares everything to the days of youth, when everything was so much better...",
                "Before actually talking to someone carefully scans their footprints.",
                "Must always have the last word.",
                "Suggests that the PC smells and needs a bath in subtle or unsubtle terms.",
                "Spells out words before he/she S-A-Y-S says them.",
                "Is constantly spewing useless and/or gross facts.",
                "Makes throaty growling noises.",
                "Speaks in riddles or couplets.",
                "Refers to others as boy or lass until they prove themselves.",
                "Tendency to stop half-way through a sentence, pause, then go back and correct themself.",
                "Repeats key words spoken to him and nods as if in agreement.",
                "Mutters to self when frustrated with others.",
                "Constantly hums or sings off key.",
                "Tends to ask stupid questions."
            ]
        },
        {
            partOfNpc: "Mental",
            descriptors: [
                "Pretends nothing can harm them.",
                "Believes themselves to be an illegitimate child of someone important.",
                "Believes they are cursed in some way.",
                "Considers themself extremely smart, and tries to show it.",
                "Impulsively counts things. (number of bricks in a wall, number of words in a sentence)",
                "Treats any and all creatures or objects as sapient, whether they are or not.",
                "Is obsessive compulsive.",
                "Obsessed with diets and weight loss.",
                "Believes they are a miniature giant.",
                "Is extremely egotistical.",
                "Feels the need for a true love.",
                "Believes it is unacceptable for a person of this position to get drunk, but would like to so much...",
                "An artistic soul, seeks beauty in the ugly things (and people). Like you.",
                "Thinks they're a legandary hero suffering from a geas (may or may not be true.)",
                "Very inquisitive about everything. Wants every detail.",
                "Is a compulsive liar",
                "Always knows better.",
                "Wishes he was a royal and is jealous of those that are.",
                "After stressfull situations needs to be alone for a while",
                "Annoying, melancholy, and negative, suffers from severe depression.",
                "Aversion to heat.",
                "Aversion to light.",
                "Aversion to certain animals (eg. insects, magpies, frogs)",
                "Freaks out over some small, common item or detail",
                "Has an irrational fear of the number 14",
                "Is afraid of dust.",
                "Avoids any kind of personal contact, is terribly afraid of poisoning or getting dirty or catching some disease.",
                "Is insanely paranoid."
            ]
        },
        {
            partOfNpc: "Social",
            descriptors: [
                "Acts insane around people he doens't like.",
                "Acts insane around strangers.",
                "Acts like a drooling idiot for unknown reasons.",
                "Has an eye for one of the players and leads all conversation towards that.",
                "Knows everybody of 'inconsequence' and is constantly interrupted by saying hi to people.",
                "Is a secret follower of some god/cult/organisation, that is not in the the least way secret",
                "Is very interested in a previous NPC that he PC has met. Possibly because they owe him money.",
                "Does not like physical contact with others",
                "Instantly hates a person for no good reason and knows it.",
                "Irritatingly modest, even about things that he/she had nothing to do with.",
                "Becomes noticeably angry for no reason (Could be used as a red herring in mystery-solving adventures)",
                "Knows some nice ladies that would love to meet you...",
                "Asks about contacts or people to see in different cities.",
                "Is constantly running schemes past people",
                "Punchs/kicks people for small mistakes",
                "Asks random people if they are willing to be a sacrifice for an obscure deity",
                "Promises revenge for all evil done to him by others",
                "Loves animals more than people."
            ]
        }
    ];

    martialMeleeWeapons = [
        "Battleaxe",
        "Flail",
        "Glaive",
        "Greataxe",	
        "Greatsword",	
        "Halberd",
        "Lance",
        "Longsword",	
        "Maul",
        "Morningstar",	
        "Pike",
        "Rapier",
        "Scimitar",	
        "Shortsword",	
        "Trident",
        "War pick",	
        "Warhammer",	
        "Whip"
    ];

    martialRangedWeapons = [
        "Blowgun",
        "Crossbow, hand",
        "Crossbow, heavy",
        "Longbow",
        "Net"
    ];

    simpleMeleeWeapons = [
        "Club",
        "Dagger",
        "Greatclub",
        "Handaxe",
        "Javelin",
        "Light hammer",
        "Mace",
        "Quarterstaff",
        "Sickle",
        "Spear"
    ];

    simpleRangedWeapons = [
        "Crossbow",
        "Dart",
        "Shortbow",
        "Sling"
    ];

    lightArmor = [
        "Padded",
        "Leather",
        "Studded leather"
    ];

    mediumArmor = [
        "Hide",
        "Chain shirt",
        "Scale mail",
        "Breastplate",
        "Half plate"
    ];

    heavyArmor = [
        "Ring mail",
        "Chain mail",
        "Splint",
        "Plate"
    ]

    commonGear = [
        "Abacus",
        "Acid (vial)",
        "Alchemist's fire (flask)",
        "Antitoxin (vial)",
        "Backpack",
        "Ball bearings (bag of 1,000)",
        "Barrel",
        "Basket",
        "Bedroll",
        "Bell",
        "Blanket",
        "Block and tackle",
        "Book",
        "Bottle, glass",
        "Bucket",
        "Caltrops (bag of 20)",
        "Candle",
        "Case, crossbow bolt",
        "Case, map or scroll",
        "Chain (10 feet)",
        "Chalk (1 piece)",
        "Chest",
        "Climber's kit",
        "Clothes, common",
        "Clothes, costume",
        "Clothes, fine",
        "Clothes, traveler's",
        "Component pouch",
        "Crowbar",
        "Fishing tackle",
        "Flask or tankard",
        "Grappling hook",
        "Hammer",
        "Hammer, sledge",
        "Healer's kit",
        "Holy water (flask)",
        "Hourglass",
        "Hunting trap",
        "Ink (1 ounce bottle)",
        "Ink pen",
        "Jug or pitcher",
        "Ladder (10 foot)",
        "Lamp",
        "Lantern, bullseye",
        "Lantern, hooded",
        "Lock",
        "Magnifying glass",
        "Manacles",
        "Mess kit",
        "Mirror, steel",
        "Oil (flask)",
        "Paper (one sheet)",
        "Parchment (one sheet)",
        "Perfume (vial)",
        "Pick, miner's",
        "Piton",
        "Poison, basic (vial)",
        "Pole (10-foot)",
        "Pot, iron",
        "Potion of healing",
        "Pouch",
        "Quiver",
        "Ram, portable",
        "Rations (1 day)",
        "Robes",
        "Rope, hempen (50 feet)",
        "Rope, silk (50 feet)",
        "Sack",
        "Scale, merchant's",
        "Sealing wax",
        "Shovel",
        "Signal whistle",
        "Signet ring",
        "Soap",
        "Spellbook",
        "Spikes, iron (10)",
        "Spyglass",
        "Tent, two-person",
        "Tinderbox",
        "Torch",
        "Vial",
        "Waterskin",
        "Whetstone"
    ];

    specialItemsBase = [
        "A mummified goblin hand",
        "A piece of crystal that faintly glows in the moonlight",
        "A gold coin minted in an unknown land",
        "A diary written in a language you don’t know",
        "A brass ring that never tarnishes",
        "An old chess piece made from glass",
        "A pair of knucklebone dice, each with a skull symbol on the side that would normally show six pips",
        "A small idol depicting a nightmarish creature that gives you unsettling dreams when you sleep near it",
        "A rope necklace from which dangles four mummified elf fingers",
        "The deed for a parcel of land in a realm unknown to you",
        "A 1-ounce block made from an unknown material",
        "A small cloth doll skewered with needles",
        "A tooth from an unknown beast",
        "An enormous scale, perhaps from a dragon",
        "A bright green feather",
        "An old divination card bearing your likeness",
        "A glass orb filled with moving smoke",
        "A 1-pound egg with a bright red shell",
        "A pipe that blows bubbles",
        "A glass jar containing a weird bit of flesh floating in pickling fluid",
        "A tiny gnome-crafted music box that plays a song you dimly remember from your childhood",
        "A small wooden statuette of a smug halfling",
        "A brass orb etched with strange runes",
        "A multicolored stone disk",
        "A tiny silver icon of a raven",
        "A bag containing forty-seven humanoid teeth, one of which is rotten",
        "A shard of obsidian that always feels warm to the touch",
        "A dragon's bony talon hanging from a plain leather necklace",
        "A pair of old socks",
        "A blank book whose pages refuse to hold ink, chalk, graphite, or any other substance or marking",
        "A silver badge in the shape of a five-pointed star",
        "A knife that belonged to a relative",
        "A glass vial filled with nail clippings",
        "A rectangular metal device with two tiny metal cups on one end that throws sparks when wet",
        "A white, sequined glove sized for a human",
        "A vest with one hundred tiny pockets",
        "A small, weightless stone block",
        "A tiny sketch portrait of a goblin",
        "An empty glass vial that smells of perfume when opened",
        "A gemstone that looks like a lump of coal when examined by anyone but you",
        "A scrap of cloth from an old banner",
        "A rank insignia from a lost legionnaire",
        "A tiny silver bell without a clapper",
        "A mechanical canary inside a gnome-crafted lamp",
        "A tiny chest carved to look like it has numerous feet on the bottom",
        "A dead sprite inside a clear glass bottle",
        "A metal can that has no opening but sounds as if it is filled with liquid, sand, spiders, or broken glass (your choice)",
        "A glass orb filled with water, in which swims a clockwork goldfish",
        "A silver spoon with an M engraved on the handle",
        "A whistle made from gold-colored wood",
        "A dead scarab beetle the size of your hand",
        "Two toy soldiers, one with a missing head",
        "A small box filled with different-sized buttons",
        "A candle that can’t be lit",
        "A tiny cage with no door",
        "An old key",
        "An indecipherable treasure map",
        "A hilt from a broken sword",
        "A rabbit’s foot",
        "A glass eye",
        "A cameo carved in the likeness of a hideous person",
        "A silver skull the size of a coin",
        "An alabaster mask",
        "A pyramid of sticky black incense that smells very bad",
        "A nightcap that, when worn, gives you pleasant dreams",
        "A single caltrop made from bone",
        "A gold monocle frame without the lens",
        "A 1-inch cube, each side painted a different color",
        "A crystal knob from a door",
        "A small packet filled with pink dust",
        "A fragment of a beautiful song, written as musical notes on two pieces of parchment",
        "A silver teardrop earring made from a real teardrop",
        "The shell of an egg painted with scenes of human misery in disturbing detail",
        "A fan that, when unfolded, shows a sleeping cat",
        "A set of bone pipes",
        "A four-leaf clover pressed inside a book discussing manners and etiquette",
        "A sheet of parchment upon which is drawn a complex mechanical contraption",
        "An ornate scabbard that fits no blade you have found so far",
        "An invitation to a party where a murder happened",
        "A bronze pentacle with an etching of a rat's head in its center",
        "A purple handkerchief embroidered with the name of a powerful archmage",
        "Half of a floorplan for a temple, castle, or some other structure",
        "A bit of folded cloth that, when unfolded, turns into a stylish cap",
        "A receipt of deposit at a bank in a far-flung city",
        "A diary with seven missing pages",
        "An empty silver snuffbox bearing an inscription on the surface that says 'dreams'",
        "An iron holy symbol devoted to an unknown god",
        "A book that tells the story of a legendary hero's rise and fall, with the last chapter missing",
        "A vial of dragon blood",
        "An ancient arrow of elven design",
        "A needle that never bends",
        "An ornate brooch of dwarven design",
        "An empty wine bottle bearing a pretty label that says, 'The Wizard of Wines Winery, Red Dragon Crush, 331422-W'",
        "A mosaic tile with a multicolored, glazed surface",
        "A petrified mouse",
        "A black pirate flag adorned with a dragon's skull and crossbones",
        "A tiny mechanical crab or spider that moves about when it’s not being observed",
        "A glass jar containing lard with a label that reads, 'Griffon Grease",
        "A wooden box with a ceramic bottom that holds a living worm with a head on each end of its body",
        "A metal urn containing the ashes of a hero"
    ]

    weapons = [
        {
            characterClass: "Barbarian", 
            items: ["Great Axe", "Two hand axes", ...this.martialMeleeWeapons, ...this.simpleMeleeWeapons]
        },
        {
            characterClass: "Bard", 
            items: ["hand crossbows", "long swords", "rapier", "short swords", ...this.simpleMeleeWeapons]
        },
        {
            characterClass: "Cleric", 
            items: ["Mace", "War Hammer", "rapier", "short swords", "light crossbow", ...this.simpleMeleeWeapons]
        },
        {
            characterClass: "Druid", 
            items: ["Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitar", "Sickle", "Slings", "Spear"]
        },
        {
            characterClass: "Fighter", 
            items: [...this.martialMeleeWeapons, ...this.simpleMeleeWeapons]
        },
        {
            characterClass: "Monk", 
            items: ["Short Swords", ...this.simpleMeleeWeapons]
        },
        {
            characterClass: "Paladin", 
            items: [...this.martialMeleeWeapons, ...this.simpleMeleeWeapons]
        },
        {
            characterClass: "Ranger", 
            items: [...this.martialMeleeWeapons, ...this.simpleMeleeWeapons]
        },
        {
            characterClass: "Rogue", 
            items: ["Hand Crossbow", "Long Sword", "Rapier", "Short Sword", ...this.simpleMeleeWeapons]
        },
        {
            characterClass: "Sorcerer", 
            items: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbow"]
        },
        {
            characterClass: "Warlock", 
            items: [...this.simpleMeleeWeapons]
        },
        {
            characterClass: "Wizard", 
            items: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbow"]
        },
        {
            characterClass: "Merchant", 
            items: ["Daggers", "Light Crossbow"]
        },
        {
            characterClass: "Clergy", 
            items: ["Daggers", "Quarterstaffs"]
        },
        {
            characterClass: "Artisan", 
            items: ["Daggers"]
        },
        {
            characterClass: "Laborer", 
            items: ["Club"]
        },
        {
            characterClass: "Worker", 
            items: ["Clubs", "Daggers", "Darts" ]
        },
        {
            characterClass: "Criminal", 
            items: [...this.simpleMeleeWeapons, ...this.simpleRangedWeapons]
        },
        {
            characterClass: "Noble", 
            items: ["hand crossbows", "long swords", "rapier", "short swords"]
        }
    ];

    armor = [
        {
            characterClass: "Barbarian", 
            items: [this.lightArmor, this.mediumArmor]
        },
        {
            characterClass: "Bard", 
            items: [...this.lightArmor]
        },
        {
            characterClass: "Cleric", 
            items: ["Scale mail", "leather armor", "chainmail", ...this.lightArmor]
        },
        {
            characterClass: "Druid", 
            items: [...this.lightArmor, ...this.mediumArmor]
        },
        {
            characterClass: "Fighter", 
            items: [...this.lightArmor, ...this.mediumArmor, ...this.heavyArmor]
        },
        {
            characterClass: "Monk", 
            items: ["None"]
        },
        {
            characterClass: "Paladin", 
            items: [...this.lightArmor, ...this.mediumArmor, ...this.heavyArmor]
        },
        {
            characterClass: "Ranger", 
            items: [...this.lightArmor, ...this.mediumArmor]
        },
        {
            characterClass: "Rogue", 
            items: [...this.lightArmor]
        },
        {
            characterClass: "Sorcerer", 
            items: ["None"]
        },
        {
            characterClass: "Warlock", 
            items: [...this.lightArmor]
        },
        {
            characterClass: "Wizard", 
            items: ["None"]
        },
        {
            characterClass: "Merchant", 
            items: ["None"]
        },
        {
            characterClass: "Clergy", 
            items: ["None"]
        },
        {
            characterClass: "Artisan", 
            items: ["None"]
        },
        {
            characterClass: "Laborer", 
            items: ["None"]
        },
        {
            characterClass: "Worker", 
            items: ["None"]
        },
        {
            characterClass: "Criminal", 
            items: ["None", ...this.lightArmor]
        },
        {
            characterClass: "Noble", 
            items: ["None", ...this.lightArmor]
        }
    ];

    specialItems = [
        {
            characterClass: "Barbarian", 
            items: [...this.specialItemsBase]
        },
        {
            characterClass: "Bard", 
            items: ["Musical Instrument of great value", ...this.specialItemsBase]
        },
        {
            characterClass: "Cleric", 
            items: ["Magic Item: Uncommon", "Magic Item: Common", ...this.specialItemsBase]
        },
        {
            characterClass: "Druid", 
            items: ["Tooth of animal friend", "Magic Item: Uncommon", "Magic Item: Common", ...this.specialItemsBase]
        },
        {
            characterClass: "Fighter", 
            items: [...this.specialItemsBase]
        },
        {
            characterClass: "Monk", 
            items: ["Book of Wisdom", "Magic Item: Uncommon", "Magic Item: Common", ...this.specialItemsBase]
        },
        {
            characterClass: "Paladin", 
            items: ["Valuable Holy Text", "Heritical Text", "Magic Item: Uncommon", "Magic Item: Common", ...this.specialItemsBase]
        },
        {
            characterClass: "Ranger", 
            items: ["Skull of defeated foe", "Magic Item: Uncommon", "Magic Item: Common", ...this.specialItemsBase]
        },
        {
            characterClass: "Rogue", 
            items: ["50 gold", "+1 Dagger", "Poison", "Gambling Debt", "Magic Item: Uncommon", "Magic Item: Common", ...this.specialItemsBase]
        },
        {
            characterClass: "Sorcerer", 
            items: ["Magic Item: Rare", "Magic Item: Uncommon", "Magic Item: Common", ...this.specialItemsBase]
        },
        {
            characterClass: "Warlock", 
            items: ["Magic Item: Rare", "Poison", "Heritical Text", "Magic Item: Uncommon", "Magic Item: Common", ...this.specialItemsBase]
        },
        {
            characterClass: "Wizard", 
            items: ["Magic Item: Rare", "Magic Item: Uncommon", "Magic Item: Common", ...this.specialItemsBase]
        },
        {
            characterClass: "Merchant", 
            items: ["Sample of Wares", ...this.specialItemsBase]
        },
        {
            characterClass: "Clergy", 
            items: ["Holy relic", ...this.specialItemsBase]
        },
        {
            characterClass: "Artisan", 
            items: ["Prized set of tools", ...this.specialItemsBase]
        },
        {
            characterClass: "Laborer", 
            items: [...this.specialItemsBase]
        },
        {
            characterClass: "Worker", 
            items: [...this.specialItemsBase]
        },
        {
            characterClass: "Rogue", 
            items: ["50 gold", "Black Mail note for wealthy noble", "Poison", "Gambling Debt", ...this.specialItemsBase]
        },
        {
            characterClass: "Noble", 
            items: ["150 gold", "2 Gems (100gp each)", "Magic Item: Common", "Poison", "Gambling Debt", ...this.specialItemsBase]
        }
    ];


    calculateAccumulatedChance(arrayOfChances) {
        let currentPercentage = 0;
    
        arrayOfChances.forEach(function(element) {
            currentPercentage += element.chance;
            element.calculatedChance = currentPercentage
        });
    }
    
    chancePicker(arrayOfItems) {
        let percentage = Math.random();
        this.calculateAccumulatedChance(arrayOfItems);
    
        for (var i = 0; i < arrayOfItems.length; i++) {
            if (arrayOfItems[i].calculatedChance >= percentage) {
                return arrayOfItems[i];
            }
        }
    }

    namePicker(race, gender) {    
        let nameObject = new Name();
    
        function nameBuilder(maleFirstName, femaleFirstName, lastName) {
            if (gender === "male") {
                nameObject.firstName = maleFirstName[Math.floor(Math.random() * maleFirstName.length)];
            } else {
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
            default:
                break;
        }
    
        return nameObject;
    }
    
    statBlockBuilder(raceStatMods) {
        let stats = new Stats();
    
        for (const key of Object.keys(stats)) {
            stats[key] = this.chancePicker(this.statProbability).number;
        }
    
        for (const key of Object.keys(raceStatMods)) {
            stats[key] += raceStatMods[key];
        }
    
        return stats;
    }

    //function for random choices in trait array of objects 
    //get random index then go into descriptor and pick a random item
    pickRandomFromTrait(traitDictionary){
        let randomDescriptor = this.getRandomIntInclusive(0, traitDictionary.length);
        let itemsFromDescriptor = traitDictionary[randomDescriptor].descriptors;

        let randomItem = itemsFromDescriptor[this.getRandomIntInclusive(0, itemsFromDescriptor.length)];

        return randomItem;
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
      }

    generateNPC() {
        let race = this.chancePicker(this.raceList);
        let raceName = race.race;

        let gender = this.chancePicker(this.gender).gender;
        let name = this.namePicker(raceName, this.gender);

        let alignment = this.chancePicker(this.alignment).alignment;
        let stats = this.statBlockBuilder(race.statMods);
        let level = this.chancePicker(this.levelList).level;

        // TODO: Add stat checking.
        let npcClass = this.chancePicker(this.classes).class;

        //roll once on basic personality trait
        let basicPersonality = this.basicPersonalityTraits[this.getRandomIntInclusive(0, this.basicPersonalityTraits.length)];
        
        //roll again on basic personality trait for minor trait. do not duplicate basic
        let majorPersonalityTrait = this.pickRandomFromTrait(this.personalityTraits);
        let minorPersonalityTrait = this.pickRandomFromTrait(this.personalityTraits);

        while(majorPersonalityTrait == minorPersonalityTrait){
            minorPersonalityTrait = this.pickRandomFromTrait(this.personalityTraits);
        }

        let personality = new Personality(majorPersonalityTrait, minorPersonalityTrait, basicPersonality);

        //roll twice on physical and mental traits but no duplicates
        let majorPhysicalTrait = this.pickRandomFromTrait(this.physicalTraits);
        let minorPhysicalTrait = this.pickRandomFromTrait(this.physicalTraits);

        while(majorPhysicalTrait == minorPhysicalTrait){
            minorPhysicalTrait = this.pickRandomFromTrait(this.physicalTraits);
        }

        let appearance = new Appearance(majorPhysicalTrait, minorPhysicalTrait);

        //roll once on weapons, armor,commonGear, special items
        function getItemForClass(npcClass, items){
            let characterClassItems = items.filter((classItems)=> {
                if(classItems.characterClass === npcClass) return classItems;
            });

        function getRandomIntInclusiveInner(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; 
            }

            characterClassItems = characterClassItems[0].items;
            let itemForClass = characterClassItems[getRandomIntInclusiveInner(0, characterClassItems.length)];
            return itemForClass;
        }

        let weapons = getItemForClass(npcClass, this.weapons);
        let armor = getItemForClass(npcClass, this.armor);
        let commonItem = this.commonGear[this.getRandomIntInclusive(0, this.commonGear.length)];
        let specialItem = getItemForClass(npcClass, this.specialItems);

        let items = new Items(weapons, armor, commonItem, specialItem);

        return new Character(stats, name, raceName, gender, alignment, level, npcClass, personality, items, appearance);
    }
}