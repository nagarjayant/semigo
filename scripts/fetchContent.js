//v2

var SheetID = "13tu_2qUQXJOBxe71w4T4o9PqZh8jpZxAdUFNUmOG-kA";
var SheetName = "Content";
var SheetName2 = "webinars";
var ovrl = $("#overlay");
var pageBody = $("#MainBody");
var url = "https://script.google.com/macros/s/AKfycbzhjAtJG0_E5DpSxao5oZWmFfv2BbLG66XWbFrcXLTb1b9U02SsT-ZuJkQh74w6Swyg/exec?id=" + SheetID + "&sheet=" + SheetName;
var url2 = "https://script.google.com/macros/s/AKfycbzhjAtJG0_E5DpSxao5oZWmFfv2BbLG66XWbFrcXLTb1b9U02SsT-ZuJkQh74w6Swyg/exec?id=" + SheetID + "&sheet=" + SheetName2;
$.getJSON(url, function (data) {
  var obj = Object.keys(data),
    json = data[obj];

  for (var i = 0; i < json.length; i++) {
    $('[data-trans="' + i + '"]').html(json[i].MasterText);
  }

  fetchSeminars();
});

function fetchSeminars() {
  $.getJSON(url2, function (data) {
    var obj = Object.keys(data),
      json = data[obj];

    for (var i = 0; i < json.length; i++) {
      $("#seminars").append('<li class="semCol"><div class="semBox"><div class="semImage"><img src="images/webinar/' + json[i].Image + '"></div><div class="semInfo"><h2 class="semName">' + json[i].Title + '</h2><div class="semDur"><span class="durIcon"><img src="images/clock.svg"></span><p class="semText">' + json[i].Duration + '</p></div><div class="semSpk"><span class="spkIcon"><img src="images/user.png"></span><p class="semText">' + json[i].Speaker + '</p></div></div><div class="actionButtons"><a href="javascript:;" class="button semBtn watch">Watch Online</a><a href="javascript:;" class="button semBtn register formOpen">' + json[i].Button + "</a></div></div></li>");
    }
    setTimeout(function () {
      ovrl.hide();
      pageBody.removeClass("is-not-scrollable");
      window.scroll(0, 0);
    }, 00);
  });
}
