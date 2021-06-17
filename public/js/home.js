let rentalListing = document.getElementById("rentalListing");
let citySearch = document.getElementById("city_search");
let stateSearch = document.getElementById("state_search");
let city;
let state;
let key = config.X_RAPIDAPI_KEY;
let host = config.X_RAPIDAPI_HOST;

$("#search_btn").on("click", function (event) {
  event.preventDefault();

  if (citySearch.value === "" || stateSearch.value === "") {
    alert("Please, enter a city and state to complete your search.");
  } else {
    city = encodeURI($("#city_search").val().trim());
    state = $("#state_search").val().trim();
    searchProperty(city, state);
  }
});

function searchProperty(city, state) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?city=${city}&state_code=${state}&limit=8&offset=0&sort=relevance`,
    method: "GET",
    headers: {
      "x-rapidapi-key": key,
      "x-rapidapi-host": host,
    },
  };
  $.ajax(settings).done(function (response) {
    let listings = response.listings;
    //console.log(listings);

    showListings(listings);
  });
}

function showListings(listings) {
  rentalListing.style.display = "block";
  for (let i = 0; i < listings.length; i++) {
    let propPhoto = listings[i].photo;
    let propStatus = listings[i].prop_status;
    let propPrice = listings[i].price;
    let propAddress = listings[i].address;
    let propBaths = listings[i].baths;
    let propBeds = listings[i].beds;

    $("#card").append(
      `
      <div id="cardListing" class="card">
        <img src="${propPhoto}" id="propertyImg" class="card-img-top" alt="Property house" />
          <div class="card-body">
            <p class="card-text">Property Status: ${propStatus}</p>
             <p class="card-text">Price: ${propPrice}</p>
             <p class="card-text">Address: ${propAddress}</p>
             <p class="card-text">Bathrooms: ${propBaths}</p>
            <p class="card-text">Beds: ${propBeds}</p>
          </div>
      </div>
      `
    );
  }
}
