"use strict";

// Apply image onload
$(document).ready(function () {
  newImage();
}); // When new image button clicked

$('.new-img').on('click', function () {
  newImage();
}); // Change image

var source;

function newImage() {
  var width = Math.round($('.image-container').innerWidth());
  source = "https://picsum.photos/".concat(width, "/?random&t=").concat(new Date().getTime());
  $('#image-holder').attr("src", source);
} // Email verification


function emailValidate(input) {
  var mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(mailFormat)) {
    return true;
  } else {
    return false;
  }
} // Save image


var createTable = true;
var present;
var cleanEmail;
var exists = false;
var id = 0;
var index;
var email;
$('.add-img').on('click', function () {
  // Gets list & input field value.
  present = Array.prototype.slice.call(document.querySelectorAll('.saved-imgs > ul > li'));
  email = $('input[type="email"]').val();

  if (!emailValidate(email)) {
    return alert("Email is invalid!");
  } // Checks if the email already exists in the list


  for (var i = 0, c = present.length; i < c; i++) {
    var listEmail = present[i].querySelector('h2').innerHTML;

    if (removeWhitespace(listEmail) === email) {
      index = i;
      exists = true;
    }
  } // If it doesn't - Add the email and image. Else - Add image to existing email.


  if (!exists) {
    addEmailAndImage();
  } else {
    exists = false;
    addToEmail();
  }

  newImage();
}); // Adds new email and image

function addEmailAndImage() {
  // Checks if the first list exists : only triggered the first time
  if (createTable) {
    var list = "<ul></ul>";
    $('.saved-imgs').append(list);
    createTable = false;
  } // Adds new email


  var item = "<li id=\"".concat(id, "\" class=\"email-list\"> <div class=\"text\"> <h2> ").concat(email, " </h2> <i class=\"fas fa-angle-down\"></i> </div> <ul>  </ul> </li>");
  $('.saved-imgs > ul').append(item);
  var innerList = "<li> <div class=\"lower-list\"><img src=\"".concat(source, "\" alt=\"Image\"> </div> </li>");
  $(".saved-imgs > ul > li#".concat(id, " > ul")).append(innerList);
  id++;
} // Add new image to existing email


function addToEmail() {
  // check if image already exists in the list
  var items = Array.prototype.slice.call($("li#".concat(index, " ul > li")));

  for (var i = 0, c = items.length; i < c; i++) {
    var image = items[i].querySelector('div > img').src;

    if (image === source) {
      return alreadyExists();
    }
  } // if image doesn't exist : create new list item


  var listItem = "<li> <div class=\"lower-list\"> <img src=\"".concat(source, "\" alt=\"Image\"> </div> </li>");
  $("li#".concat(index, " > ul")).append(listItem);
} // Removes whitespace from email.


function removeWhitespace(e) {
  var email;

  for (var i = 0, c = e.length; i < c; i++) {
    if (e[i] !== ' ') {
      if (email) {
        email += e[i];
      } else {
        email = e[i];
      }
    }
  }

  return email;
}

function alreadyExists() {
  return alert("Image is already assigned to that email.");
}