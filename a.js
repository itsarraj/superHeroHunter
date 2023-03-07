const object1 = {
    name: "SuperHero",
    youtube: "Deec",
};

const stringifyObject = JSON.stringify(object1);

console.log(object1);

// {
//     "name": "SuperHero",
//     "youtube": "Deec"
// }

const backToObject = JSON.parse(stringifyObject);

console.log(backToObject);

// {
//     "name": "SuperHero",
//     "youtube": "Deec"
// }
