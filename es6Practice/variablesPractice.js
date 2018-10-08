class SpaceShip {
    constructor() {
        this.passengers = 1;
        this.fuel = 2;
        this.food = 2;
        this.tech = 1;
    }

    printShipStats() {
        return `The ship has 
        ${this.passengers} passengers, 
        ${this.food} years of food, 
        ${this.fuel} tons of fuel, 
        and is at tech level ${this.tech}`;
    }

    jumpToHyperSpace(canJump = false) {
        if (canJump) {
            return "Translating to Hyperspace";
        } else {
            return "We dont have that Tech"
        }
    }

    getFuel() {
        return this.fuel;
    }

    getFuelAndFood() {
        return [this.food, this.fuel];
    }
}

let defaultSpaceShip = new SpaceShip();
console.log(defaultSpaceShip.printShipStats());
console.log(defaultSpaceShip.jumpToHyperSpace());

let longRangeSpaceShip = new SpaceShip();
let { passengers: crew, fuel: energy, food: rations, tech: techLevel } = longRangeSpaceShip;
let fuel = longRangeSpaceShip.getFuel()
let [shipFuel, shipFood] = longRangeSpaceShip.getFuelAndFood();

console.log(`Ship fuel is ${shipFuel} and Ship food is ${shipFood}`);
console.log(fuel);
console.log(crew);
console.log(rations);
console.log(energy);
console.log(techLevel);

let oddShip = { robots: undefined, powerPellets: undefined, machineGodLevel: undefined };
({ passengers: oddShip.robots, fuel: oddShip.powerPellets, tech: oddShip.machineGodLevel } = longRangeSpaceShip);

console.log(`odd ship robots ${oddShip.robots}`);
console.log(`odd ship power pellets ${oddShip.powerPellets}`);
console.log(`odd ship closeness to the machine god ${oddShip.machineGodLevel}`);

longRangeSpaceShip.fuel = 45;
longRangeSpaceShip.tech = 3;
longRangeSpaceShip.food = 50;
longRangeSpaceShip.passengers = 5;

console.log(longRangeSpaceShip.printShipStats());
console.log(longRangeSpaceShip.jumpToHyperSpace(true));

let AICore = { faction: "Ultimate", influence: 34, agents: 5000, nodes: 8 };

function getAIInfo() {
    return `This is an AI`;
}

let AI = {
    __proto__: AICore,
    getAIInfo
}

console.log(AI.getAIInfo());

let simpleArrow = x => x * 2;
console.log(simpleArrow(2));

let objectArrowWithNoParams = () => ({ foo: 1 });
console.log(objectArrowWithNoParams().foo);

let multipleParamsArrow = (x, y) => x * y;
console.log(multipleParamsArrow(2, 3));

let arrowFunctionWithObjectReturn = x => {
    if (x) {
        return { boolean: true };
    } else {
        return { boolean: false };
    }
}

console.log(arrowFunctionWithObjectReturn(true).boolean);

let restTest = (...x) => {
    for (let i = 0; i < x.length; i++) {
        console.log("Arg" + x[i]);
    }
}

restTest(1, 2, 3, 4);

let spreadTest = (x, y, z, a, b, c) => {
    console.log(x)
    console.log(y)
    console.log(z)
    console.log(a)
    console.log(b)
    console.log(c)
}

spreadTest(...[1, 2, 3, 4, 5, 6, 7]);

function* simpleGenerator() {
    console.log("Before Yields");

    yield 3;
    yield 4;
}

let simpleGenTest = simpleGenerator();

console.log(simpleGenTest.next());
console.log(simpleGenTest.next());
console.log(simpleGenTest.next());

const testArray = [1, 2, 3, 4]

let mapArray = testArray.map(x => x * 2)
console.log(mapArray);

let filterArray = testArray.filter(x => { if (x % 2 === 0) return x; })
console.log(filterArray);

let filterAndMapArray = testArray.filter(x => { if (x % 2 === 0) return x; }).map(x => x * 2);
console.log(filterAndMapArray);

let arrayResult = testArray.reduce((accum, value) => accum * value);
console.log(arrayResult);

for (let element of testArray) {
    console.log(element);
}

let passMeAnObject = ({ firstName, lastName }) => { console.log(`Hello ${firstName} ${lastName}`) };
passMeAnObject({ firstName: "Eowyn", lastName: "Shieldmaiden of the Onion Knight" });