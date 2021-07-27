let rentalListing = document.getElementById("rentalListing");
let propStatus = document.getElementById("propStatus");
let citySearch = document.getElementById("city_search");
let stateSearch = document.getElementById("state_search");
let zipCodeContainer = document.getElementById("zipCodeContainer");
let codeInput = document.getElementById("codeInput");
let city;
let state;
let key = config.X_RAPIDAPI_KEY;
let host = config.X_RAPIDAPI_HOST;
let url;
let rent = true;
let sale = false;

$("#search_btn").on("click", function (event) {
  event.preventDefault();

  if (citySearch.value === "" || stateSearch.value === "") {
    alert("Please, enter a city and state to complete your search.");
  } else {
    city = encodeURI($("#city_search").val().trim());
    state = $("#state_search").val().trim();
    choosePropStatus();
  }
});

$("#searchByCode").on("click", function (event) {
  event.preventDefault();
  enterZipCode();
});

$("#searchForSaleByCode").on("click", function (event) {
  event.preventDefault();
  rent = false;
  sale = true;
  enterZipCode();
});

// Choose between rentals or for sale
function choosePropStatus() {
  propStatus.style.display = "block";
  // Rental button
  $("#rentalBtn").on("click", function (event) {
    event.preventDefault();
    url = `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?city=${city}&state_code=${state}&limit=10&offset=0&sort=relevance`;
    console.log(url);
    searchProperties(url);
    propStatus.style.display = "none";
  });

  // On sale button
  $("#onSaleBtn").on("click", function (event) {
    event.preventDefault();
    url = `https://realty-in-us.p.rapidapi.com/properties/list-for-sale?state_code=${state}&city=${city}&offset=0&limit=10&sort=relevance`;
    console.log(url);
    searchProperties(url);
    propStatus.style.display = "none";
  });
}

// Enter zip code input
function enterZipCode() {
  zipCodeContainer.style.display = "block";

  $("#zipCodeBtn").on("click", function (event) {
    event.preventDefault();
    if (codeInput.value === "") {
      alert("Please, enter a valid zip code to complete your search.");
    } else if (rent && !sale) {
      codeInput = $("#codeInput").val().trim();
      url = `https://realtor.p.rapidapi.com/properties/list-for-rent?state_code=0&city=0&limit=200&offset=0&postal_code=${codeInput}&sort=relevance`;
      searchProperties(url);
    } else if (!rent && sale) {
      codeInput = $("#codeInput").val().trim();
      url = `https://realtor.p.rapidapi.com/properties/list-for-sale?state_code=0&city=0&limit=200&offset=0&postal_code=${codeInput}&sort=relevance`;
      searchProperties(url);
    }
  });
}

// Search properties
function searchProperties(url) {
  console.log(url);
  const settings = {
    async: true,
    crossDomain: true,
    url: url,
    method: "GET",
    headers: {
      "x-rapidapi-key": key,
      "x-rapidapi-host": host,
    },
  };
  $.ajax(settings).done(function (response) {
    let listings = response.listings;
    console.log(listings);
    showListings(listings);
  });
}

// Property Listings
function showListings(listings) {
  rentalListing.style.display = "block";
  for (let i = 0; i < listings.length; i++) {
    let propPhoto = listings[i].photo;
    let propStatus = listings[i].prop_status;
    let propPrice = listings[i].price;
    let propAddress = listings[i].address;
    let propBaths = listings[i].baths;
    let propBeds = listings[i].beds;

    $("#propListing").append(
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
