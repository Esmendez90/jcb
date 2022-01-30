let cityName;
let zipCode;
let selectProp;
let today;
let listings = [];
let x;
let newArr = [];
let res = [];
let latestListings = [];

function getTodayDate() {
  today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;
  //console.log(today);
}

$(".latest-listForm").on("submit", function (event) {
  event.preventDefault();

  cityName = $("#cityName").val().trim();
  zipCode = $("#zipCode").val().trim();

  let ele = document.getElementsByName("select-prop-type");
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) selectProp = ele[i].value.toLowerCase();
  }

  listings = [];
  x;
  newArr = [];
  res = [];
  latestListings = [];
  $(".cardListing").remove();

  //console.log(cityName, zipCode, selectProp);
  getTodayDate();
  apiCall(cityName, zipCode, selectProp);
});

function apiCall(cityName, zipCode, propType) {
  cityName = encodeURI(cityName);
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://realty-in-us.p.rapidapi.com/properties/list-for-${propType}?state_code=NJ&city=${cityName}&limit=200&offset=0&postal_code=${zipCode}`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "realty-in-us.p.rapidapi.com",
      "x-rapidapi-key": "fbf1849f58mshc4a745d4d24f860p128e2fjsn3c711de2d5ef",
    },
  };

  $.ajax(settings).done(function (response) {
    listings = response.listings;
    //console.log(listings);
    // Formatting date of last_update
    x = listings.map((obj) => {
      return obj.last_update.split("T").join("").slice(0, 10);
    });

    daysLastUpdate(x);
  });
}

function daysLastUpdate(x) {
  // Evaluating the number of days since the last update
  for (var i = 0; i < x.length; i++) {
    // console.log(x[i]);
    let day1 = new Date(x[i]);
    let day2 = new Date(today);
    let dif = Math.abs(day2 - day1);
    let d = dif / (1000 * 3600 * 24);
    res.push(d);
  }
  // Transforming each object to include new property
  newArr = listings.map((obj, index) => ({
    ...obj,
    days_since_last_update: res[index],
  }));

  // console.log(newArr);
  filterLatestListings(newArr);
}

function filterLatestListings(newArr) {
  //console.log(newArr);
  //  returns only listings with 7 or less days since last update
  newArr.filter((obj) => {
    if (obj.days_since_last_update <= 7) {
      latestListings.push(obj);
    }
  });

  // console.log(latestListings);
  showLatestListings(latestListings);
}

function showLatestListings(listings) {
  document.getElementById(
    "resultsId"
  ).innerHTML = `<span style="color:rgb(195, 9, 90)">Showing results from last <strong>7</strong> days.</span> <br>Results for <strong>${selectProp}</strong> in <strong>${cityName.toUpperCase()}</strong>: ${
    latestListings.length
  } found. `;

  for (let i = 0; i < listings.length; i++) {
    let photo = listings[i].photo;
    let status = listings[i].prop_status;
    let price = listings[i].price;
    let address = listings[i].address;
    let baths = listings[i].baths;
    let beds = listings[i].beds;
    let type = listings[i].prop_type;

    if (photo) {
      photo = photo;
    } else if ((photo = "undefined")) {
      photo =
        "https://images.freeimages.com/images/large-previews/338/house-2-1225477.jpg";
    }

    appendToCard(photo, price, status, address, baths, beds, type);
  }
}

function appendToCard(photo, price, status, address, baths, beds, type) {
  $("#propListing").append(
    `
      <div class="cardListing">
        <img src="${photo}" class="card-img-top propertyImg" alt="Property house" />
          <div class="card-body">
          <div><p class="card-text">${type}</p>  <p class="card-text">${status}</p></div>
            
              <p class="card-text" style="font-weight: bold;
                 font-size: 20px;">${price}</p>
             
            <div style="display: inline-flex;">
             <p class="card-text" style="margin-right: 15px;"><strong>${baths}</strong> bath(s)</p>
             <p class="card-text"><strong>${beds}</strong> bed(s)</p>
            </div>
             <p class="card-text" style="white-space: pre-wrap;">${address}</p> 
          </div>
      </div>
  
    `
  );
}