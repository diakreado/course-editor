$(function() {
  // clear
  $("input").on("focus", function() {
    $("p.error").remove();
    $("input").removeClass("error");
  });

  // register
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
      url: "/registration"
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
});
