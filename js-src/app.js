
 
// Apply image onload
$(document).ready(() => {
    newImage();
})

// When new image button clicked
$('.new-img').on('click', (e) => {
    e.preventDefault();
    newImage();
})

// Change image
let source;

function newImage() {

    let width = Math.round($('.image-container').innerWidth());

    source = `https://picsum.photos/${width}/?random&t=${new Date().getTime()}`;
    $('#image-holder').attr("src", source);
}


// Email verification
function emailValidate(input) {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(mailFormat)) {
        return true;
    } else {
        return false;
    }
}


// Save image
let createTable = true;
let present;
let cleanEmail;
let exists = false;
let id = 0;
let index;
let email;

$('.add-img').on('click', (e) => {
    e.preventDefault();
    
    // Gets list & input field value.
    present = Array.prototype.slice.call(document.querySelectorAll('.saved-imgs > ul > li'));
    email = $('input[type="email"]').val();

    // Validated email.
    if (!emailValidate(email)) {
        $('.popup').removeClass("popup-hidden");
        $('.inval-mail').css({display: "block"});
        setTimeout(() => {
            $('.popup').addClass("popup-hidden");
        }, 3000);
        setTimeout(() => {
            $('.inval-mail').css({display: "none"});
        }, 3100);
        return;
    }
    
    // Checks if the email already exists in the list
    for (let i = 0, c = present.length; i < c; i++) {
        let listEmail = present[i].querySelector('h2').innerHTML;

        if (removeWhitespace(listEmail) === email) {
            index = i;
            exists = true;
        }
    }

    // If it doesn't - Add the email and image. Else - Add image to existing email.
    if (!exists) {
        addEmailAndImage();
        $('.popup').removeClass("popup-hidden");
        $('.new-email').css({display: "block"});
        setTimeout(() => {
            $('.popup').addClass("popup-hidden");
        }, 3000);
        setTimeout(() => {
            $('.new-email').css({display: "none"});
        }, 3100);
    } else {
        exists = false;
        addToEmail();
        $('.popup').removeClass("popup-hidden");
        $('.add-to-email').css({display: "block"});
        setTimeout(() => {
            $('.popup').addClass("popup-hidden");
        }, 3000);
        setTimeout(() => {
            $('.add-to-email').css({display: "none"});
        }, 3100);
    }

    setTimeout(() => {
        newImage();
    }, 3200);
})

// Adds new email and image
function addEmailAndImage() {

    // Checks if the first list exists : only triggered the first time
    if (createTable) {

        let list = `<ul></ul>`;

        $('.saved-imgs').append(list);

        createTable = false;

    }

    // Adds new email

    let item = `<li id="${id}" class="email-list"> <div class="text"> <h2> ${email} </h2> <i class="fas fa-angle-down"></i> </div> <ul>  </ul> </li>`;

    $('.saved-imgs > ul').append(item);

    let innerList = `<li> <div class="lower-list"><img src="${source}" alt="Image"> </div> </li>`

    $(`.saved-imgs > ul > li#${id} > ul`).append(innerList);

    id++;
}


// Add new image to existing email
function addToEmail() {

    // check if image already exists in the list
    let items = Array.prototype.slice.call($(`li#${index} ul > li`));

    for (let i = 0, c = items.length; i < c; i++) {
        let image = items[i].querySelector('div > img').src;
        
        if (image === source) {
            return alreadyExists();
        }
    }

    // if image doesn't exist : create new list item
    let listItem = `<li> <div class="lower-list"> <img src="${source}" alt="Image"> </div> </li>`

    $(`li#${index} > ul`).append(listItem);
}


// Removes whitespace from email.
function removeWhitespace(e) {
    let email;

    for (let i = 0, c = e.length; i < c; i++) {
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
    $('.popup').removeClass("popup-hidden");
    $('.already-assigned').css({display: "block"});
    setTimeout(() => {
        $('.popup').addClass("popup-hidden");
    }, 3000);
    setTimeout(() => {
        $('.already-assigned').css({display: "none"});
    }, 3100);
    return;
}
