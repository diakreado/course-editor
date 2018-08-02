$(function() {
  // clear
  $("input").on("focus", function() {
    $("p.error").remove();
    $("input").removeClass("error");
  });
});
