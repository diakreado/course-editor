$(function() {
  /* Load image */
  $("#file").on("change", function(e) {
    e.preventDefault();

    var formData = new FormData();
    formData.append("courseId", $("#courseId").val());
    formData.append("file", $("#file")[0].files[0]);

    $.ajax({
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      url: "/upload/image"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.reload();
      }
    });
  });
});
