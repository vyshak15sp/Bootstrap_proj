emailjs.init('5rcemQjiw5ewrra4d');

const form = document.getElementById('contact-form'); // Replace 'myForm' with your form ID

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

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
      oldForm.parentNode.replaceChild(newForm, oldForm);


      // document.getElementById('contact-form').reset();
      
      // Clear the reCAPTCHA response
      grecaptcha.reset();
      
      // Handle success message or any further actions
    })
    .catch(function(error) {
      console.log('Email sending failed:', error);
      alert('There was an error sending your message. Please try again later.');
      // Handle error message or any further actions
    });
}
