$(function() {
  /* Load image */
  $("#imageFile").on("change", function(e) {
    e.preventDefault();

    var formData = new FormData();
    formData.append("courseId", $("#courseId").val());
    formData.append("file", $("#imageFile")[0].files[0]);

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

  /* Load sound */
  $("#soundFile").on("change", function(e) {
    e.preventDefault();

    var formData = new FormData();
    formData.append("taskId", $("#taskId").val());
    formData.append("file", $("#soundFile")[0].files[0]);

    $.ajax({
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      url: "/upload/sound"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.reload();
      }
    });
  });
});
