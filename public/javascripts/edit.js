$(function() {
  /* Edit course */
  $(".save-curse").on("click", function(e) {
    e.preventDefault();

    var data = {
      title: $("#nameOfCourse").val(),
      discripiton: $("#discripitonOfCourse").val(),
      logo: $("#logoFile").val(),
      complexity: $("form")[0]["complexityOfCurse"].value,
      category: $("#categoryOfCurse").val(),
      authors: $("#authorsOfCourse").val(),
      published: $("#published").is(":checked"),
      id: $("#courseId").val()
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/edit/course"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.reload();
      }
    });
  });
});
