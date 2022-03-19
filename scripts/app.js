const scriptURL = "https://script.google.com/macros/s/AKfycbwlzt-vqfCzkI7AWmvx-7ZgEA7dsymwMRkGoomfNHwTHUHDUpDwSU1s6WzHR2zuZ6di/exec";
const $form = $("#seminarForm");
var webinarName = "";
var date = "";
var today = new Date();
var last = new Date(1940 - 01 - 01);
var request;
var emailprov = "";

//search
$(document).ready(function () {
  $("#searchBox").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    if (value.length === 0) {
      $(".semCol").show();
    } else {
      $(".semRes .semCol").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    }
    //console.log(value);
  });
});

//form
$(document).ready(function () {
  //upload form open
  $(".formOpen").on("click", function () {
    webinarName = $(this).parent().parent().find(".semName").text();
    $("#MainBody").addClass("is-not-scrollable");
    $(".formOverlay").removeClass("formFade");
    $(".formContainer").removeClass("formFade");
    $(".formMainBox").addClass("formActive");
    $("#webinar").val(webinarName);
  });

  //upload form close
  $("#formClose").click(function () {
    $("#MainBody").removeClass("is-not-scrollable");
    $(".formOverlay").addClass("formFade");
    $(".formContainer").addClass("formFade");
    $(".formMainBox").removeClass("formActive");
  });

  //close on escape
  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      $("#MainBody").removeClass("is-not-scrollable");
      $(".formOverlay").addClass("formFade");
      $(".formContainer").addClass("formFade");
      $(".formMainBox").removeClass("formActive");
    }
  });
});

//form validation
$(document).ready(function () {
  $("input").focusin(function () {
    $(".formContainer").addClass("nscroll");
  });
  $(document).on("focus", "input,select,textarea", function () {
    $(".voteformContainer").addClass("nscroll");
  });
  $("input").focusout(function () {
    $(".formContainer").removeClass("nscroll");
  });

  $(".formMainBox").on("touchmove", function (e) {
    $(".formContainer").removeClass("nscroll");
  });

  //allow only numbers to Phone
  $("#Phone").keypress(function (evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  });

  //validate Phone and email
  var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
  }

  //validate on blur
  $(".uploadIP, #Email").focusout(function () {
    var emailVal = $("#Email").val();
    if ($(this).val().length === 0 || !validateEmail(emailVal)) {
      $(this).parent().addClass("error");
      $(this).parent().find(".valMsg").show();
    } else {
      $(this).parent().removeClass("error");
      $(this).parent().addClass("valid");
      $(this).parent().find(".valMsg").hide();
    }
  });

  //dob validation
  $("#dob").focusout(function () {
    date = new Date($(this).val());

    if (date > today || date < last || $("#dob").val().length === 0) {
      $(this).parent().addClass("error");
      $(this).parent().find("#datVal").show();
    } else {
      $(this).parent().removeClass("error");
      $(this).parent().addClass("valid");
      $(this).parent().find("#datVal").hide();
    }
  });

  $(document).on("click", "#uploadFormBtn", function (event) {
    event.preventDefault();
    var PhoneVal = $("#Phone").val();
    var emailVal = $("#Email").val();

    if ($("#FirstName").val().length === 0) {
      $("#FirstName").parent().addClass("error");
      $("#FirstName").parent().find(".valMsg").show();
    } else if ($("#LastName").val().length === 0) {
      $("#LastName").parent().addClass("error");
      $("#LastName").parent().find(".valMsg").show();
    } else if ($("#Email").val().length === 0 || !validateEmail(emailVal)) {
      $("#Email").parent().addClass("error");
      $("#Email").parent().find(".valMsg").show();
    } else if ($("#Phone").val().length === 0 || filter.test(PhoneVal) != true) {
      $("#Phone").parent().addClass("error");
      $("#Phone").parent().find(".valMsg").show();
    } else if ($("#dob").val().length === 0) {
      $("#dob").parent().addClass("error");
      $("#dob").parent().find("#datVal").show();
    } else if ($("#Occupation").val().length === 0) {
      $("#Occupation").parent().addClass("error");
      $("#Occupation").parent().find(".valMsg").show();
    } else {
      $(".formrow").addClass("valid");
      $(".formrow").removeClass("valid");
      emailprov = $("#Email").val();
      if (request) {
        request.abort();
      }
      var $inputs = $form.find("input, select, button, textarea");
      var serializedData = $form.serialize();
      $inputs.prop("disabled", true);
      request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwlzt-vqfCzkI7AWmvx-7ZgEA7dsymwMRkGoomfNHwTHUHDUpDwSU1s6WzHR2zuZ6di/exec",
        type: "post",
        data: serializedData,
      });
      // Callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR) {
        // Log a message to the console
        console.log("Hooray, it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
        $(".form-content").hide();
        $("#emailProv").html(emailprov);
        $(".thank-content").show();
      });

      // Callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown) {
        // Log the error to the console
        console.error("The following error occurred: " + textStatus, errorThrown);
      });

      request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
        document.getElementById("seminarForm").reset();
      });

      // Prevent default posting of form
      event.preventDefault();
    }
  });
});

//submit form
/* form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      $("#MainBody").removeClass("is-not-scrollable");
      $(".formOverlay").addClass("formFade");
      $(".formContainer").addClass("formFade");
      $(".formMainBox").removeClass("formActive");
    })
    .catch((error) => console.error("Error!", error.message));
}); */
