//v1

var SheetID = "13tu_2qUQXJOBxe71w4T4o9PqZh8jpZxAdUFNUmOG-kA";
var SheetName = "Content";
var ovrl = $("#overlay");
var pageBody = $("#MainBody");
var url = "https://script.google.com/macros/s/AKfycbzhjAtJG0_E5DpSxao5oZWmFfv2BbLG66XWbFrcXLTb1b9U02SsT-ZuJkQh74w6Swyg/exec?id=" + SheetID + "&sheet=" + SheetName;

$.getJSON(url, function (data) {
  var obj = Object.keys(data),
    json = data[obj];

  for (var i = 0; i < json.length; i++) {
    $('[data-trans="' + i + '"]').html(json[i].MasterText);
  }

  setTimeout(function () {
    ovrl.hide();
    pageBody.removeClass("is-not-scrollable");
    window.scroll(0, 0);
  }, 00);
});
