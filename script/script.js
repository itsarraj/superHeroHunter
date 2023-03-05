// hash 334b09e4b9df89d3649360679b5e2988

// var MD5 = require("crypto-js/md5");
// // public key
// let publicKey = "e1de55e77fe1473b015ecf2427a9e302";

// // private key
// let privateKey = "9e33edcbd45ebe99987c07b3fc60a09331b5e691";

// let ts = new Date().getTime();
// let hash = MD5(ts + privateKey + publicKey);
// console.log(hash.toString());

let superHeroes = [];
// API call to get the data
async function fetchSuperHeroes() {
    //Get request
    try {
        const response = await fetch(
            `https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith=${name}&apikey=e1de55e77fe1473b015ecf2427a9e302&hash=334b09e4b9df89d3649360679b5e2988`
        );
        const data = await response.json();
        // console.log(response , data);
        // superHeroes = data.slice(0,10);
        // console.log(superHeroes);
    } catch (error) {
        console.log(error);
    }
}

function startApp() {
    fetchSuperHeroes();
    console.log("Starting app...");
}

startApp();
