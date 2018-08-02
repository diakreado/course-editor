$(function() {
  // registration
  $(".register-button").on("click", function(e) {
    e.preventDefault();

    var data = {
      name: $("#register-name").val(),
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
        $("p.error").remove();
        $("input").removeClass("error");

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
        $("p.error").remove();
        $("input").removeClass("error");

        $(".login h2").after('<p class="error">' + data.error + "</p>");
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
});
