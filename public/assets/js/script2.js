console.log("is this even working");

let city = "west new york";
let cityName = encodeURI(city);
console.log(cityName);
// $(".btn-secondary").on("click", function (event) {
//   event.preventDefault();
//   $(".cityNameContainer").css("display", "block");
// });

// $("#cityName-Btn").on("click", function (event) {
//   event.preventDefault();
//   city = encodeURI($("#cityInput").val().trim());
//   console.log(city);
//  searchProperties(city);
  // if ($.inArray(state, stateInit.split(" ")) >= 0) {
  //   choosePropStatus();
  // } else if (citySearch.value === "" || stateSearch.value === "") {
  //   alert("Please, enter a city and state to complete your search.");
  // } else {
  //   alert("Please, enter valid U.S state initials.");
  // }
//});

function searchProperties(){
const settings = {
  async: true,
  crossDomain: true,
  url: `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?state_code=NJ&city=${cityName}&limit=200&offset=0&sort=relevance`,
  method: "GET",
  headers: {
    "x-rapidapi-host": "realty-in-us.p.rapidapi.com",
    "x-rapidapi-key": "fbf1849f58mshc4a745d4d24f860p128e2fjsn3c711de2d5ef",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response.listings);
  showListings(response.listings);
});
}

function showListings(listings) {
  for (let i = 0; i < listings.length; i++) {
    let propPhoto = listings[i].photo;
    let propStatus = listings[i].prop_status;
    let propPrice = listings[i].price;
    let propAddress = listings[i].address;
    let propBaths = listings[i].baths;
    let propBeds = listings[i].beds;

    if (propPhoto) {
      propPhoto = listings[i].photo;
    } else if ((propPhoto = "undefined")) {
      propPhoto =
        "https://images.freeimages.com/images/large-previews/338/house-2-1225477.jpg";
    }

    $("#propListing").append(
      `
      <div class="card cardListing">
        <img src="${propPhoto}" class="card-img-top propertyImg" alt="Property house" />
          <div class="card-body">
             <p class="card-text">PRICE: <span>${propPrice}</span></p>
             <p class="card-text">ADDRESS: <span>${propAddress}</span></p>
             <p class="card-text">BATHROOMS: <span>${propBaths}</span></p>
             <p class="card-text">BEDS: <span>${propBeds}</span></p>
             <p class="card-text">STATUS: <span>${propStatus}</span></p>
          </div>
      </div>
      `
    );
  }
}

searchProperties();