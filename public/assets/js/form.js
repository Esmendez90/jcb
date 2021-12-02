// if (location.pathname === "/") {
//   $(".search-icon").on("click", function (event) {
//     event.preventDefault();
//     $(".form-container").removeClass("animate__animated animate__backOutUp");
//     $(".prop-form-main").css("display", "block");
//     $(".form-container").addClass("animate__animated animate__backInDown");
//     $(".prop-form-main").css("position", "absolute");
//     $(".prop-form-main").css("z-index", "1");
//     $(".prop-form-main").css("transform", "translate(6%, 0%)");
//     $(".prop-form-main").css("background-color", "rgb(6 6 6 / 60%)");
//   });

//   $(".fa-times").on("click", function (event) {
//     event.preventDefault();
//     $(".form-container").addClass("animate__animated animate__backOutUp");
//     setTimeout(function () {
//       $(".prop-form-main").css("display", "none");
//     }, 0500);
//   });
// }

// $(".prop-form-main").on("submit", function (event) {
//   event.preventDefault();
//   console.log("ron ron ron!!!");
//   let checkedVal = document.querySelector(
//     ".form-check-input[type=radio]:checked"
//   ).value;
//   let cityName = $("#cityName").val().trim();
//   cityName = encodeURI(cityName);
//   let zipCode = $("#zipCode").val().trim();
//   console.log(checkedVal, cityName, zipCode);
// });
