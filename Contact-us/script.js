var fields = {};

function getGender() {
    return document.querySelector('input[name="gender"]:checked')
   }


   document.addEventListener("DOMContentLoaded", function() {
    fields.firstName = document.getElementById('firstName');
    fields.lastName = document.getElementById('lastName');
    fields.email = document.getElementById('email');
    fields.address = document.getElementById('address');
    fields.country = document.getElementById('country');
    fields.question = document.getElementById('question');
   })

   function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined' ) return false;
    return (value.length > 0);
   }

   function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
   }

   function isValid() {
    var valid = true;
    
    valid &= fieldValidation(fields.firstName, isNotEmpty);
    valid &= fieldValidation(fields.lastName, isNotEmpty);
    valid &= fieldValidation(fields.gender, isNotEmpty);
    valid &= fieldValidation(fields.country, isNotEmpty);
    valid &= fieldValidation(fields.email, isEmail);
    valid &= fieldValidation(fields.question, isNotEmpty);
   
    return valid;
   }

   class User {
    constructor(firstName, lastName, gender, country, email, question) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.country = country;
    this.email = email;
    this.question = question;
    }
   }

   function sendContact(){
    fields.gender = getGender();

    if (isValid){
        let usr = new User(firstName.value, lastName.value, fields.gender.value, country.value, isEmail.value)
        alert(`${usr.firstName} thanks for registering.`)
    } else{
        alert("There was an Error")
    }
   }