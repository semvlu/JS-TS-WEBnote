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


// Template Literal Types: custom types
type Colour = "red" | "green" | "blue";
type HexColour<T extends Colour> = `#${string}`;
