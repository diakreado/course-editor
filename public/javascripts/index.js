$(function() {
  // clear
  function removeErrors() {
    $("p.error").remove();
    $("input").removeClass("error");
    $("textarea").removeClass("error");
  }

  $("input").on("focus", function() {
    removeErrors();
  });

  // registration
  $(".register-button").on("click", function(e) {
    e.preventDefault();

    removeErrors();

    var data = {
      login: $("#register-login").val(),
      password: $("#register-password").val(),
      passwordConfirm: $("#register-password-confirm").val()
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/auth/registration"
    }).done(function(data) {
      if (!data.ok) {
        removeErrors();

        $(".register h1").after('<p class="error">' + data.error + "</p>");
        if (data.fields) {
          data.fields.forEach(function(item) {
            $("input[name=" + item + "]").addClass("error");
          });
        }
      } else {
        location.href = "/";
      }
    });
  });

  // login
  $(".login-button").on("click", function(e) {
    e.preventDefault();

    removeErrors();

    var data = {
      login: $("#login-login").val(),
      password: $("#login-password").val()
    };

    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/auth/login"
    }).done(function(data) {
      if (!data.ok) {
        removeErrors();

        $(".login h2").after('<p class="error">' + data.error + "</p>");
        if (data.fields) {
          data.fields.forEach(function(item) {
            $("input[name=" + item + "]").addClass("error");
          });
        }
      } else {
        location.reload();
      }
    });
  });

  $(".add-new-project").on("click", function(e) {});

  $(".add-new-lesson").on("click", function(e) {
    $(".add-new-lesson").before("<p>Новый урок</p>");
  });

  // Create curse
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
      published: $("#published").val()
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
});
