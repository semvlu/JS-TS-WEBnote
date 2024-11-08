<script src="index.js"></script> // Decl. in HTML
innerHTML; // write HTML elem
document.write(); // write HTML output, will delete existing HTML, for testing
window.alert("Warning: Are you sure to leave this page?"); // write alert box: popup on the top as warning
console.log(); // write browser console


function mod(params) {
    document.getElementById("header1").innerHTML = 'Mod to this string';
    const a = 5, b = 11;
    let c = a + b;
    console.log(typeof(a)); // Data type

    document.getElementById("price").innerHTML = c;
}

// Obj
const carManufacturers = ["Mercedes", "Volkswagen", "BMW"];
const car = {brand:"Mercedes", model:"Maybach"};
car.engine = "V8"; // add new property
delete car.engine;

let carInfo = "";
for (p in car) {
    carInfo += car[p] + "\t"; // must use [p], not .x
}
const carInfoArr = Object.values(car); // obj properties in array
let obj2JSON = JSON.stringify(car);
document.getElementById("carInfo").innerHTML = carInfo;


const person = {};
person.firstName = "John";
person.lastName = "Doe";
person.age = 33;

// Obj constructor func
function Person(first, last, age, eye) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.eyeColor = eye;
}

const Jane = new Person("Jane", "King", 40, "blue");


const date = new Date("2000-12-31");

// HTML event
// <element event="JS code"></element> // event: onchange, onclick, onmouseover, onmouseout, onkeydown, onload
<button onclick="this.innerHTML = Date()"> Current Time </button>

// String
let string1 = "This is a string";
let _3rdChar = string1.at(3); // negative enable also, -2 = string.length-2
let padded = string1.padStart(12, "_"); // pad: _ till reaches length 12
let newString = string1.replace("This", "That"); // TBreplace, replacer
template = `${header}`;
// RegEx
let regex = "RegEx Example";
let regexIdx = regex.search(/example/i); // i: case insensitive
// Set
const letters = new Set(["a","b","c"]);

for (const i of letters.keys()) { // of: loop iterable obj, e.g. obj.values(), obj.entries(): [key,value]
    text += i;
}

// Try, catch, finally
try {
    let x = 6;
    if (x < 5) throw "Too low";
    else if (x > 10) throw "Too high";

} catch (error) {
    document.getElementById("elemID").innerHTML = `${error.name}: ${error}`;
} finally {
    document.getElementById("elemID").innerHTML = "This will be executed \
    regardless of the result";
}

// Arrow
funcNoArrow = function(param1) {
    return "Without arrow" + param1;
}
funcArrow = (param1) => {
    return "With arrow" + param1;
}

// Module: message.js
//-------------message.js-------------------
const message = (name, age) => {
    return `Hello, Name: ${name}, Age: ${age}`;
}
export default message;
// -----------------------------------------
import message from "./message.js";


// Variable params
function sum(...args) {
    let sum = 0;
    for (let arg of args)
        sum += arg;
    return sum;
}


// Callback func
setTimeout(() => {
    func1();
    func2();
}, timeout);

// Promise, producer, consumer
let p = new Promise(function(resolve, reject) {
    // Producer code
    let x;
    setTimeout(() => {
        x = 0; 
        if (x == 0) resolve("OK"); // succes
        else reject("ERROR"); // error
    }, 2000);
});


// Consumer code
p.then(
    function(value) { 
        document.getElementById("pDisp").innerHTML = value;},
    function(error) { 
        document.getElementById("pDisp").innerHTML = error;}
);

// e.g. get a file
let pGetFile = new Promise(function(res,rjt) {
    // Fetch: in place of XMLHttpRequest
    fetch('file.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.text;
        })
        .then(data => {res(data);})
        .catch(error => {rjt(error);})

        
    // XMLHttpRequest
    let req = new XMLHttpRequest();
    req.open('GET', 'file.txt', true);
    req.onload = () => {
        if(req.status == 200) {
            res(req.responseText);
        } else {
            rjt("Error");
        }
    };
    req.send();
});
pGetFile.then(
    function(value) {
        document.getElementById("pDisp").innerHTML = value;
    },
    function(error) {
        document.getElementById("pDisp").innerHTML = error;
    }
)


// Async & Await
// Async makes a func return promise
// Await makes a func wait for a promise 
async function func1() {
    let p = new Promise(function(res,rjt) {
        setTimeout(() => {
            if (true) res("OK");
            else rjt("ERROR");
        }, 3000);
    });

    try { 
        document.getElementById("pDisp").innerHTML = await p; 
    } 
    catch (err) { document.getElementById("pDisp").innerHTML = err;
    } 
    /*
    return "TEST";
    
        Equiv. to:
        function func1() {
            return Promise.resolve("TEST");
        }
    */
}
func1.then(
    function(value) { /* success code*/ },
    function(error) { /* error code*/ }
)



// Web API
$(() => { // shortcut for: $(document).ready( ()=>{} );
    $("#posBtn").click(() => {
        getLoc();
    });
});
function getLoc() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPos);
    } else {
        document.getElementById("pos").innerHTML = "Geolocation not supported";
    }
}
function showPos(position) {
    document.getElementById("pos").innerHTML = 
    "Latitude: " + position.coords.latitude + "<br>" +
    "Longitude: " + position.coords.longitude;
}

$(() => {
    $("#trigAlert").click(() => {
        window.alert("POPUP!!!");
    });
});
