emailjs.init('5rcemQjiw5ewrra4d');

const form = document.getElementById('contact-form'); // Replace 'myForm' with your form ID
const successMessageElement = document.getElementById('successMessage');


form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const recaptchaResponse = grecaptcha.getResponse(); // Get reCAPTCHA response

  if (!recaptchaResponse) {
    // Handle reCAPTCHA not completed error
    alert('Please complete the reCAPTCHA.');
    return;
  }

  // If reCAPTCHA is completed, proceed to send the form data
  if (validateForm()) {
    sendFormData();
  }
});
function validateName(event){
  const name = document.getElementById('name');

  if (name.value.trim() === '') {
    name.classList.remove('valid');
    name.classList.add('invalid');
    isValid = false;
  } else {
    name.classList.remove('invalid');
    name.classList.add('valid');
  }

}
function validateForm() {
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  let isValid = true;

  // Validate name field
  
  // Validate email field
  if (email.value.trim() === '' || !isValidEmail(email.value.trim())) {
    email.classList.remove('valid');
    email.classList.add('invalid');
    isValid = false;
  } else {
    email.classList.remove('invalid');
    email.classList.add('valid');
  }

  // Validate message field
  if (message.value.trim() === '') {
    message.classList.remove('valid');
    message.classList.add('invalid');
    isValid = false;
  } else {
    message.classList.remove('invalid');
    message.classList.add('valid');
  }
  return isValid;
}

function isValidEmail(email) {
  // Use a regular expression to validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function sendFormData() {
  // Capture form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Create template parameters
  const templateParams = {
    from_name: name,
    from_email: email,
    message_html: message
  };

  // Send form data using EmailJS or any other desired method
  emailjs.send('service_y21mze4', 'template_50bdudl', templateParams)
    .then(function(response) {
      console.log('Email sent successfully:', response);
      // Show success message in the contact us modal
      successMessageElement.innerText = 'Your message has been sent!';
      successMessageElement.style.display = 'block';
      // $('#successModal').modal('show');
      // alert("The message has been sucessfully sent.")

      // Reset the form
        form.reset();
      
      // Clear the reCAPTCHA response
      grecaptcha.reset();
      
      // Handle success message or any further actions
    })
    .catch(function(error) {
      console.log('Email sending failed:', error);
      // $('#errorModal').modal('show');
      alert("oops!.")

      // Handle error message or any further actions
    });
}
