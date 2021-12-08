if (location.pathname === "/") {
  $(".login-icon").on("click", function (event) {
    event.preventDefault();
    $(".prop-form-main").removeClass("animate__animated animate__backOutUp");
    $(".prop-form-main").css("display", "block");
    $(".prop-form-main").addClass("animate__animated animate__backInDown");
    $(".prop-form-main").css("position", "absolute");
    $(".prop-form-main").css("z-index", "1");
    $(".prop-form-main").css("transform", "translate(6%, 0%)");
    $(".prop-form-main").css("background-color", "rgb(6 6 6 / 60%)");
  });

  $(".fa-times").on("click", function (event) {
    event.preventDefault();
    $(".prop-form-main").addClass("animate__animated animate__backOutUp");
    setTimeout(function () {
      $(".prop-form-main").css("display", "none");
    }, 0500);
  });
}

$(".prop-form-main").on("submit", function (event) {
  event.preventDefault();
   console.log("ron ron ron!!!");
 
});
