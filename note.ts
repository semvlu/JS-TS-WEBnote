// any type, but avoid this
let whatever: any = "whatever can be any type, now it is string";
whatever = false;

let un: unknown;
un = 20;
let assigned: number = un as number; // as: when assign 
// a var: unknown to another var

const arr: number[] = [];
for (let i = 0; i < 10; i++) {
    arr.push(i);
}

// readonly: unable to mod
const names: readonly string[] = ["Alice", "Bob", "Eve"];

// Tuple
let tup: [number, string, boolean];
tup = [1, "Champion", true];
tup.push(55);
// Named: tuple
const graph: [number, number, number] = [-14, 30, -77];
const [x, ,z] = graph;
const [head, ...remain ] = graph;

// Object
// Optional property: <prop>?: <type>
const car: { manufacturer: string, age?: number } = { // age: opt.
    manufacturer: "Ferrari",
};
// Index signature
const nameAgeMap: { [index: string]: number } = {};
nameAgeMap.Victor = 25;
// nameAgeMap.Laurence = "Thirty"; // Error: Type 'string' not assignable to type 'number'


// Alias
type Manu = string;
type Model = string;
type Year = number;
type Car = {
    manufacturer: Manu,
    model: Model,
    year?: Year
}
const car1: Car = {
    manufacturer: "Ferrari",
    model: "Daytona SP3"
};

// Function
const getNum = (): number => Math.random();
// Spec return type if necessary: void, number, string...
function printNum(n: number): void { console.log(n); }

function func1(a: number, b?: number, factor: number = 10, ...rest: number[]) {
    // result = (a + b + rest) * 10
    let result: number = 0;
    result = a + (b || 0);
    for (let i = 0; i < rest.length; i++) {
        result += rest[i];
    }
    result *= factor;
    return result;
}

// Union type
function printStatus(code: string | number) {
    console.log(`status code: ${code}`);
}

// enum
enum CardinalDir {
    // default 0,1,2,3...
    North = 1, // or be string: 'North'
    South, // 2
    East, // 3
    West  // 4
};

// interface
interface Rectangle {
    width: number;
    height: number;
}
// interface extension
interface coloredRectangle extends Rectangle {
    color: string;
}

const rec: Rectangle = {
    width: 10,
    height: 20
};

const coloredRec: coloredRectangle = {
    width: 10,
    height: 20,
    color: "red"
};

// Casting
// var as type / <type>var
let u: unknown = 'string of unknown type';
let s: string = <string>u; // casting
s = u as string; // same as <string>u

// Class
class Animal {
    private readonly name: string;
    private age: number;
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    // Alt:
    // public constructor(private name: string, private age: number) {}
    public sound() { console.log('Animal makes a sound'); }
}
// Inheritance
class Dog extends Animal {
    private voice: string;
    public constructor(name: string, age: number, voice: string) {
        super(name, age);
        this.voice = voice;
    }
    public sound() {console.log(this.voice);} // override
}

let d = new Dog('Johnny', 3 ,'HRRRRRRrrr');
d.sound();

// Generics
function createPair<S, T>(v1: S, v2: T): [S, T] { return [v1, v2]; }
function createExtPair<S extends string | number, T extends string | number>(v1: S, v2: T) {
    console.log(`Creating Pair:\n\t v1: ${typeof v1} ${v1}\n\t v2: ${typeof v2} ${v2}`);
    return [v1, v2];
}
let p = createExtPair('Extended', 101);

class NamedVal<T> {
    private value: T | undefined;

    constructor(private name: string) {}
    public setValue(value: T) { this.value = value; }
    public getValue(): T | undefined { return this.value; }
    public toStr(): String { return `${this.name}: ${this.value}`; }
}
let v = new NamedVal<number>('muNum'); // Gen<type>
v.setValue(5);
console.log(v.toStr());

// Use generics when type and #vars uncertain
type ApiResp<Data = {status: number}> = { // default Data: status: number
    data: Data,
    isErr: boolean
};
type UserResp = ApiResp<{ name: string; age: number; }>;
const r: UserResp = {
    data: {
        name: "Alex",
        age: 30
    },
    isErr: false
};

// Type Util
// Partial: all prop in an obj be opt
interface Point {
    x: number;
    y: number;
    z: number;
    alpha: number;
}

let pt_1D: Partial<Point> = {};
pt_1D.x = 12;
// Required: all prop in an obj req
let pt: Required<Point> = {
    x: 12,
    y: 24,
    z: 36,
    alpha: 48
};
// Omit: all prop in an obj be opt except the ones specified
let pt_2D_O: Omit<Point, 'z' | 'alpha'> = {
    x: 1,
    y: 2
    // z & alpha removed, cannot def
}
// Pick: select prop from an obj
let pt_2D_P: Pick<Point, 'z' | 'alpha'> = {
    z: 1,
    alpha: 2
    // x & y removed, cannot def
}
// Readonly: create new readonly type
const pt_rOnly: Readonly<Point> = {
    x: 1,
    y: 2,
    z: 3,
    alpha: 4
}

// Exclude: remove types from a union
type Primal = boolean | number | string | null | undefined
const primBool: Exclude<Primal, string> = true;


// ReturnType: extract 'return' type of a func type
type PointGenfromReturn = () => { x: number; y: number;};
const pt_ret: ReturnType<PointGenfromReturn> = {
    x: 1,
    y: 2
};

// Parameters: extract 'param' types of a func type as arr
type PointGenfromParam = (p: { x: number; y: number; }) => void;
const pt_param: Parameters<PointGenfromParam>[0] = {
    x: 1,
    y: 2
};


// Record: shortcut to def obj type w/ spec key:value type
const nameBirthMap: Record<string, number> = { // equiv. { [key: string]: number }
    'John': 2000,
    'Jane': 2001,
    'Jasper': 2002
}; 

// keyof: extract key type from an obj type
function printSingleAxis(p: Point, property: keyof Point) {
    console.log(p[property]);
}
printSingleAxis(pt, "alpha");

//  key of with Index Signature
type Triad<T> = [T, T, T];
type BWH = { [key: string]: Triad<number> };
function bodyMsur(property: keyof BWH, value: Triad<number>): BWH {
  return { [property]: value };
}
const b = bodyMsur("Alex", [92,60,88]);

// Optional Chaining: ?.
// acc. properties of an obj, obj may/not exist  
class House {
    private sqm: number;
    private yard?: {
        sqm: number;
        garden: boolean;
    };
    constructor (sqm: number, yard?: { sqm: number; garden: boolean; }) {
        this.sqm = sqm;
        this.yard = yard;
    }

    public printYard(): void {
        const size = this.yard?.sqm;
        const g = this.yard?.garden;
        if (this.yard === undefined) console.log("No yard");
        else console.log(`Yard is ${size} square metres, and has a garden? ${g}`);
    }
};
const h = new House(100, {sqm: 21, garden: true});
h.printYard();
const room = new House(39);
room.printYard();

// Nullish Coalescence: ??: deal with null/undefined
const printMileage = (mileage: number | null | undefined) => {
    console.log(`Mileage: ${mileage ?? 'Not Available'}`);
}
           
// Definitely Typed: some NPM pkg does not support type
// Deifnitely Typed is to support the lack
// npm install --save-dev @types/<module>

// Template Literal Types: custom types
type Colour = "red" | "green" | "blue";
type HexColour<T extends Colour> = `#${string}`;
