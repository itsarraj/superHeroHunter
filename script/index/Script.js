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
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
    if (favouritesCharacterIDs == null) {
        favouritesCharacterIDs = new Map();
    } else if (favouritesCharacterIDs != null) {
        favouritesCharacterIDs = new Map(
            JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
        );
    }

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
                    <a class="character-info" href="./superHeroPage.html">
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
                            </div>
                        </div>
                    </a>

                    <div id="favBtnNew" class="favBtnNew">
                        <div class="cardi">
                            <button id = "addToFavBtn">${
                                favouritesCharacterIDs.has(`${hero.id}`)
                                    ? '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites'
                                    : '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites</button>'
                            }
                        </div>
                    </div>
                </div>
                `;
        }
        count++;
    }
    //Adding the events to the buttons after they are inserted in dom
    events();
}

function events() {
    let favBtn = document.querySelectorAll(".addToFavBtn");
    favBtn.forEach((btn) => btn.addEventListener("click", addToFav));
    let charInfo = document.querySelectorAll(".charInfo");
    charInfo.forEach((char) =>
        char.addEventListener("click", addInfoInLocalStorage)
    );
}

function addToFavourites() {
    if (
        this.innerHTML ==
        '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites'
    ) {
        let heroInfo = {
            name: this.parentElement.parentElement.children[2].children[0]
                .innerHTML,
            description:
                this.parentElement.parentElement.children[2].children[1]
                    .innerHTML,
            comics: this.parentElement.parentElement.children[2].children[2]
                .innerHTML,
            series: this.parentElement.parentElement.children[2].children[3]
                .innerHTML,
            stories:
                this.parentElement.parentElement.children[2].children[4]
                    .innerHTML,
            portraitImage:
                this.parentElement.parentElement.children[2].children[5]
                    .innerHTML,
            id: this.parentElement.parentElement.children[2].children[6]
                .innerHTML,
            landscapeImage:
                this.parentElement.parentElement.children[2].children[7]
                    .innerHTML,
            squareImage:
                this.parentElement.parentElement.children[2].children[8]
                    .innerHTML,
        };
        let favouritesArray = localStorage.getItem("favouriteCharacters");
        if (favouritesArray == null) {
            favouritesArray = [];
        } else {
            favouritesArray = JSON.parse(
                localStorage.getItem("favouriteCharacters")
            );
        }
        let favouritesCharacterIDs = localStorage.getItem(
            "favouritesCharacterIDs"
        );

        if (favouritesCharacterIDs == null) {
            favouritesCharacterIDs = new Map();
        } else {
            favouritesCharacterIDs = new Map(
                JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
            );
        }

        favouritesCharacterIDs.set(heroInfo.id, true);
        favouritesArray.push(heroInfo);
        localStorage.setItem(
            "favouritesCharacterIDs",
            JSON.stringify([...favouritesCharacterIDs])
        );
        localStorage.setItem(
            "favouriteCharacters",
            JSON.stringify(favouritesArray)
        );
        this.innerHTML =
            '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';
        document
            .querySelector(".fav-toast")
            .setAttribute("data-visiblity", "show");
        setTimeout(function () {
            document
                .querySelector(".fav-toast")
                .setAttribute("data-visiblity", "hide");
        }, 1000);
    } else {
        let idOfCharacterToBeRemoveFromFavourites =
            this.parentElement.parentElement.children[2].children[6].innerHTML;
        let favouritesArray = JSON.parse(
            localStorage.getItem("favouriteCharacters")
        );
        let favouritesCharacterIDs = new Map(
            JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
        );
        let newFavouritesArray = [];
        favouritesCharacterIDs.delete(
            `${idOfCharacterToBeRemoveFromFavourites}`
        );
        favouritesArray.forEach((favourite) => {
            if (idOfCharacterToBeRemoveFromFavourites != favourite.id) {
                newFavouritesArray.push(favourite);
            }
        });
        localStorage.setItem(
            "favouriteCharacters",
            JSON.stringify(newFavouritesArray)
        );
        localStorage.setItem(
            "favouritesCharacterIDs",
            JSON.stringify([...favouritesCharacterIDs])
        );
        this.innerHTML =
            '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';
        document
            .querySelector(".remove-toast")
            .setAttribute("data-visiblity", "show");
        setTimeout(function () {
            document
                .querySelector(".remove-toast")
                .setAttribute("data-visiblity", "hide");
        }, 1000);
    }
}

//Superhero Hunter App Initialization
// superHeroApp.initialize();
//----------------------------------------------------------------
