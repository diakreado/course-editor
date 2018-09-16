$(function() {
  /* Load image */
  $("#fileinfo").on("submit", function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      url: "/uploads/image"
    }).done(function(data) {
      console.log(data);

      if (!data.ok) {
      } else {
        location.reload();
      }
    });
  });
});
