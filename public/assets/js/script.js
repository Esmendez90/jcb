console.log("is this even working");

let city = "west new york"; // should be user input
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
