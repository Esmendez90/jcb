console.log("is this even working");
let rentalListing = document.getElementById("rentalListing");
let city = "west new york";
city = encodeURI(city);
console.log(city);

const settings = {
  async: true,
  crossDomain: true,
  url: `https://realty-in-us.p.rapidapi.com/properties/list-for-rent?state_code=NJ&city=${city}&limit=200&offset=0&sort=relevance`,
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


function showListings(listings) {
  rentalListing.style.display = "block";
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
        "https://i0.wp.com/reviveyouthandfamily.org/wp-content/uploads/2016/11/house-placeholder.jpg?ssl=1";
    }

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
