$(function() {
  /* EDIT Save course */
  $(".save-curse").on("click", function(e) {
    e.preventDefault();

    var data = {
      title: $("#nameOfCourse").val(),
      discripiton: $("#discripitonOfCourse").val(),
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

  /* EDIT Delete course */
  $(".delete-curse").on("click", function(e) {
    e.preventDefault();

    var data = {
      id: $("#courseId").val()
    };

    $.ajax({
      type: "DELETE",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/edit/course"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.href = "/";
      }
    });
  });

  /* EDIT Delete lesson */
  $(".delete-lesson").on("click", function(e) {
    e.preventDefault();

    var data = {
      id: $("#lessonId").val()
    };

    $.ajax({
      type: "DELETE",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/edit/lesson"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.href = data.url;
      }
    });
  });

  /* EDIT Save lesson */
  $(".save-lesson").on("click", function(e) {
    e.preventDefault();

    var data = {
      title: $("#nameOfLesson").val(),
      number: $("#numberOfLesson").val(),
      discripiton: $("#discripitonOfLesson").val(),
      duration: $("#durationOfLesson").val(),
      courseId: $("#courseId").val(),
      id: $("#lessonId").val()
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/edit/lesson"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.reload();
      }
    });
  });

  /* EDIT Save task */
  $(".save-task").on("click", function(e) {
    e.preventDefault();

    var data = {
      number: $("#idOfTask").val(),
      instructions: $("#instructionsOfTask").val(),
      text: $("#textOfTask").val(),
      id: $("#taskId").val()
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/edit/task"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.reload();
      }
    });
  });

  /* EDIT Delete task */
  $(".delete-task").on("click", function(e) {
    e.preventDefault();

    var data = {
      id: $("#taskId").val()
    };

    $.ajax({
      type: "DELETE",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/edit/task"
    }).done(function(data) {
      if (!data.ok) {
      } else {
        location.href = data.url;
      }
    });
  });
});
