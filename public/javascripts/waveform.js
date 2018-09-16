$(function() {
  var wavesurfer = WaveSurfer.create({
    container: "#waveform",
    scrollParent: true
  });

  var data = {
    id: $("#taskId").val()
  };

  $.ajax({
    type: "GET",
    data: data,
    url: "/upload/sound"
  }).done(function(data) {
    wavesurfer.load("../../uploads/" + data.path);
  });
});
