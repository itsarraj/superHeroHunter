// hash 334b09e4b9df89d3649360679b5e2988
// let publicKey = "e1de55e77fe1473b015ecf2427a9e302";
// let privateKey = "9e33edcbd45ebe99987c07b3fc60a09331b5e691";

//----------------------------------------------------------------

//Variable Declaration//
// const searchInput = document.getElementById("search-input");
const searchInput = document.getElementsByTagName("input")[0];
const searchResults = document.getElementById("search-results");
searchInput.addEventListener("input", () =>
    fetchSuperHeroes(searchInput.value)
);

//Superhero Hunter App API Initialization
async function fetchSuperHeroes(searchedValue) {
    // console.log("searchedValue: " + searchedValue);
    if (searchedValue == "") {
        searchResults.innerHTML = "";
        return;
    }

    try {
        await fetch(
            `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchedValue}&ts=1&apikey=e1de55e77fe1473b015ecf2427a9e302&hash=334b09e4b9df89d3649360679b5e2988`
        )
            .then((response) => response.json())
            .then((datas) => showSearchResults(datas.data.results));
    } catch (error) {
        console.log(error);
    }
}

//----------------------------------------------------------------
// Function: Create Random Character

const rand = (() => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomCharacter =
        alphabet[Math.floor(Math.random() * alphabet.length)];
    return {
        random: randomCharacter,
    };
})();
//----------------------------------------------------------------

fetchSuperHeroes(rand.random);

function showSearchResults(APIdata) {
    //show the search results
    searchResults.innerHTML = "";
    let count = 1;

    // iterating the APIdata array using for loop
    for (const key in APIdata) {
        // if count <= 5 then only we display it in dom other results are discarded
        if (count <= 12) {
            // getting the single hero
            // hero is the object that we get from API
            let hero = APIdata[key];
            // Appending the element into DOM
            searchResults.innerHTML += `<!-- A div with container id to hold the card -->
            <div id="container">
                <!-- A div with card class for the card  -->
                <div class="card">
                    <img
                        src="${
                            hero.thumbnail.path +
                            "/portrait_medium." +
                            hero.thumbnail.extension
                        }"
                        alt=""
                        style="width: 100%"
                    />
                    <!-- A div with card__details class to hold the details in the card  -->
                    <div class="card__details">
                        <!-- Span with tag class for the tag -->
                        <span class="tag">ID : ${hero.id}</span>
                        <span class="tag">Comics :${
                            hero.comics.available
                        }</span>
                        <span class="tag">Events : ${
                            hero.events.available
                        }</span>
                        <span class="tag">Series :${
                            hero.series.available
                        }</span>
                        <span class="tag">Stories : ${
                            hero.stories.available
                        }</span>
                        <!-- A div with name class for the name of the card -->
                        <div class="name">${hero.name}</div>
                        <p class="description">
                           ${hero.description}
                        </p>
                        <button id = "addToFavBtn">Add to Favourites</button>
                        <button id = "addToFavBtn" style= "display: none">Added to Favourites</button>

                    </div>
                </div>
            </div>`;
        }
        count++;
    }
}

//Superhero Hunter App Initialization
// superHeroApp.initialize();
//----------------------------------------------------------------
