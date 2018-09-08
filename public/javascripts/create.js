$(function() {
  // clear
  function removeErrors() {
    $("p.error").remove();
    $("input").removeClass("error");
    $("textarea").removeClass("error");
  }

  /* Create curse */
  $(".create-curse").on("click", function(e) {
    e.preventDefault();

    removeErrors();

    var data = {
      title: $("#nameOfCourse").val(),
      discripiton: $("#discripitonOfCourse").val(),
      logo: $("#logoFile").val(),
      complexity: $("form")[0]["complexityOfCurse"].value,
      category: $("#categoryOfCurse").val(),
      authors: $("#authorsOfCourse").val(),
      published: $("#published").is(":checked")
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/create/course"
    }).done(function(data) {
      if (!data.ok) {
        removeErrors();

        $(".header p").after('<p class="error">' + data.error + "</p>");
        if (data.fields) {
          data.fields.forEach(function(item) {
            $("input[name=" + item + "]").addClass("error");
            $("textarea[name=" + item + "]").addClass("error");
          });
        }
      } else {
        removeErrors();
        location.href = data.url;
      }
    });
  });

  /* Create lesson */
  $(".create-lesson").on("click", function(e) {
    e.preventDefault();

    var data = {
      title: $("#nameOfLesson").val(),
      number: $("#numberOfLesson").val(),
      discripiton: $("#discripitonOfLesson").val(),
      logo: $("#logoFile").val(),
      duration: $("#durationOfLesson").val(),
      id: $("#courseId").val()
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/create/lesson"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.href = data.url;
      }
    });
  });

  /* Create task */
  $(".create-task").on("click", function(e) {
    e.preventDefault();

    var data = {
      number: $("#idOfTask").val(),
      instructions: $("#instructionsOfTask").val(),
      text: $("#textOfTask").val(),
      sound: $("#soundFile").val(),
      pitch: $("#pitchFile").val(),
      lessonId: $("#lessonId").val()
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/create/task"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.href = data.url;
      }
    });
  });
});
