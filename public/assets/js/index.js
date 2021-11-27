$(".search-icon").on("click", function (event) {
  event.preventDefault();
  $(".form-container").removeClass("animate__animated animate__backOutUp");
  $(".prop-form").css("display", "block");
  $(".form-container").addClass("animate__animated animate__backInDown");
  $(".prop-form").css("position", "absolute");
  $(".prop-form").css("z-index", "1");
  $(".prop-form").css("transform", "translate(6%, 0%)");
  $(".prop-form").css("background-color", "rgb(6 6 6 / 60%)");
});

$(".fa-times").on("click", function (event) {
  event.preventDefault();
  $(".form-container").addClass("animate__animated animate__backOutUp");
  setTimeout(function () {
    $(".prop-form").css("display", "none");
  }, 0500);
});
