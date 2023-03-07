// Get Items that are stored in Local Storage
//  I'll Get Items through ID (Bacause all have different Id's)
var resultId = localStorage.getItem("id");
console.log(resultId);
// Fetch Will be done!
// fetchID();
// Get all the data from Fetch

async function fetchID(idd) {
    try {
        await fetch(
            `https://gateway.marvel.com/v1/public/characters/${idd}?&ts=1&apikey=e1de55e77fe1473b015ecf2427a9e302&hash=334b09e4b9df89d3649360679b5e2988`
        )
            .then((response) => response.json())
            .then((datas) => {
                var JsonResult = datas.data.results;
                console.log(datas.data.results);
                showResultIdResults(datas.data.results);
            });
    } catch (error) {
        console.log(error);
    }
}

function showResultIdResults(APIdata) {
    // if count <= 5 then only we display it in dom other results are discarded

    // getting the single hero
    // hero is the object that we get from API
    let hero = APIdata[0];
    // Appending the element into DOM
    let superResults = document.getElementById("super-results");
    superResults.innerHTML += `
    <div class="flex-row hero-img-and-more-info">
    <img id="portraitImage" class="hero-img" src="${
        hero.thumbnail.path +
        "/landscape_incredible." +
        hero.thumbnail.extension
    }" alt="">
    <div class="card">
        <div class="flex-col more-info txtarea">
                <div class="flex-col hero-name">${hero.name}</div>
                <div class="flex-row id">
                    <b>ID:</b><span>${hero.id}</span>
                </div>
                <div class="flex-row comics">
                    <b>Comics:</b><span>${hero.comics.available}</span>
                </div>
                <div class="flex-row series">
                    <b>Series:</b><span>${hero.series.available}</span>
                </div>
                <div class="flex-row stories">
                    <b>Stories:</b><span>${hero.stories.available}</span>
                </div>
                <div class="flex-row stories">
                    <b>Events:</b><span>${hero.events.available}</span>
                </div>
        </div>
         <br>

         <div class="flex-col desp hero-discription">
                         <b>Discription:</b>
                         <p><span class = "desss">${
                             hero.description != ""
                                 ? hero.description
                                 : "No Description Available"
                         }</span></p>
                    </div>
    </div>
    <div class = "flex-row"id="favBtnNew" class="favBtnNew">
                    <div class="cardi">
                        <button id = "addToFavBtn" class = "addToFavBtn" onclick="showAddedToFav2()"  >
                                <i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites</button>
                    </div>
                </div>

            </div>





            `;

    document
        .getElementById("addToFavBtn")
        .addEventListener("click", function () {
            console.log("click ", hero.id);
            var index = localStorage.length;
            var data = JSON.stringify(APIdata);
            localStorage.setItem(hero.id, data);
        });

    // let favBtn = document.getElementById("addtoastx");
    // favBtn.className = "show";
    // setTimeout(function () {
    //     favBtn.className = favBtn.className.replace("show", "");
    // }, 3000);
}

fetchID(resultId);

//  This is a function for displaying a alert box type message on the bottom of the screen, when we add to fav. heros.

function showAddedToFav2() {
    let favSetup = document.getElementById("addtoastx");
    favSetup.className = "show";
    setTimeout(function () {
        favSetup.className = favSetup.className.replace("addtoastx show", "");
    }, 1500);
    setTimeout(function () {
        favSetup.className = favSetup.className.replace("", "addtoastx show");
    }, 1500);
}
