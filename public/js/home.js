let city;
let state;

$("#search_btn").on("click", function (event) {
  event.preventDefault();

  city = encodeURI($("#city_search").val().trim());
  state = $("#state_search").val().trim();
  searchProperty(city, state);
});

function searchProperty(city, state) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://realtor.p.rapidapi.com/properties/v2/list-for-rent?city=${city}&state_code=${state}&limit=200&offset=0&sort=relevance`,
    method: "GET",
    headers: {
      "x-rapidapi-key": "fbf1849f58mshc4a745d4d24f860p128e2fjsn3c711de2d5ef",
      "x-rapidapi-host": "realtor.p.rapidapi.com",
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(settings.url);
  });
}

