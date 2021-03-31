let city;
let state;
let key = config.X_RAPIDAPI_KEY;
let host = config.X_RAPIDAPI_HOST;

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
      "x-rapidapi-key": key,
      "x-rapidapi-host": host,
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(settings.url);
  });
}

