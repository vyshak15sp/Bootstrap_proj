emailjs.init('5rcemQjiw5ewrra4d');

let formSubmitted = false; // Variable to track whether the form has been submitted

const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  if (formSubmitted) {
    return; // If form has already been submitted, ignore subsequent submissions
  }

  const recaptchaResponse = grecaptcha.getResponse(); // Get reCAPTCHA response

  if (!recaptchaResponse) {
    // Handle reCAPTCHA not completed error
    alert('Please complete the reCAPTCHA.');
    return;
  }

  // If reCAPTCHA is completed, proceed to send the form data
  sendFormData();
});

function sendFormData() {
  // Set formSubmitted to true to prevent multiple submissions
  formSubmitted = true;

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
      alert('Your message has been sent!');

      // Reset the form
      const oldForm = document.getElementById('contact-form');
      const newForm = document.createElement('form');
      newForm.id = 'contact-form';
      newForm.innerHTML = oldForm.innerHTML;
      oldForm.parentNode.replaceChild(newForm, oldForm);;

      // Clear the reCAPTCHA response
      grecaptcha.reset();

      // Reset formSubmitted to allow subsequent submissions
      formSubmitted = false;

      // Handle success message or any further actions
    })
    .catch(function(error) {
      console.log('Email sending failed:', error);
      alert('There was an error sending your message. Please try again later.');

      // Reset formSubmitted to allow subsequent submissions
      formSubmitted = false;

      // Handle error message or any further actions
    });
}

// Function to remove the event listener and reset the formSubmitted flag
function closeModal() {
  form.removeEventListener('submit', sendFormData);
  formSubmitted = false;
}

// Example: Call the closeModal() function when closing the modal
function closeMyModal() {
  // Code to close the modal
  const modal = document.getElementById('exampleModal'); // Replace 'myModal' with the ID of your modal element
  // Close the modal by adding a CSS class
  modal.classList.add('hidden');

  closeModal();
}
