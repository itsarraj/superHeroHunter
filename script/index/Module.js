//----------------------------------------------------------------
//Revealing Module Pattern using IIFE Module Design Patterns//
//----------------------------------------------------------------

const superHeroApp = (() => {
    //Variable Declaration//
    const input = document.getElementsByTagName("input"[0]);
    console.log(input);
    let searchBar = document.getElementById("search-bar");
    let searchResults = document.getElementById("search-results");

    //----------------------------------------------------------------
    return {
        // initialize: initializeApp,
    };
})();

//----------------------------------------------------------------
