emailjs.init("5rcemQjiw5ewrra4d");

const form = document.getElementById("contact-form");
const successMessage = document.getElementById("thankYouMessage");
const resetFormBtn = document.getElementById("resetFormBtn");
const closeButton = document.getElementById("closeButton");

// Add event listeners for real-time validation
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const messageField = document.getElementById("message");

nameField.addEventListener("input", validateName);
emailField.addEventListener("input", validateEmail);
messageField.addEventListener("input", validateMessage);

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const recaptchaResponse = grecaptcha.getResponse(); // Get reCAPTCHA response

  if (!recaptchaResponse) {
    // Handle reCAPTCHA not completed error
    alert("Please complete the reCAPTCHA.");
    return;
  }

  // If reCAPTCHA is completed, proceed to send the form data
  if (validateForm()) {
    sendFormData();
  }
});

closeButton.addEventListener("click", function () {
  form.reset();
  grecaptcha.reset();
  resetFieldValidation();
});

function validateForm() {
  // Perform final validation before form submission
  validateName();
  validateEmail();
  validateMessage();

  const isValid = form.querySelectorAll(".invalid").length === 0;
  return isValid;
}

function validateName() {
  const name = nameField.value.trim();

  if (name === "") {
    nameField.classList.remove("valid");
    nameField.classList.add("invalid");
  } else {
    nameField.classList.remove("invalid");
    nameField.classList.add("valid");
  }
}

function validateEmail() {
  const email = emailField.value.trim();

  if (email === "" || !isValidEmail(email)) {
    emailField.classList.remove("valid");
    emailField.classList.add("invalid");
  } else {
    emailField.classList.remove("invalid");
    emailField.classList.add("valid");
  }
}

function validateMessage() {
  const message = messageField.value.trim();

  if (message === "") {
    messageField.classList.remove("valid");
    messageField.classList.add("invalid");
  } else {
    messageField.classList.remove("invalid");
    messageField.classList.add("valid");
  }
}

function isValidEmail(email) {
  // Use a regular expression to validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function sendFormData() {
  // Capture form data
  const name = nameField.value;
  const email = emailField.value;
  const message = messageField.value;

  // Create template parameters
  const templateParams = {
    from_name: name,
    from_email: email,
    message_html: message,
  };

  function SentMessage() {
    form.style.display = "none";
    thankYouMessage.style.display = "block";
  }

  resetFormBtn.addEventListener("click", function () {
    form.style.display = "block";
    thankYouMessage.style.display = "none";
  });

  // Send form data using EmailJS or any other desired method
  emailjs
    .send("service_y21mze4", "template_50bdudl", templateParams)
    .then(function (response) {
      console.log("Email sent successfully:", response.status, response.text);
      if (response.status === 200) {
        SentMessage();
        form.reset();
        resetFieldValidation();

        // Clear the reCAPTCHA response
        grecaptcha.reset();
      } else {
        alert("Oops! Something went wrong. Please try again later.");
      }
    })
    .catch(function (error) {
      console.log("Email sending failed:", error);
      alert("Oops! Something went wrong. Please try again later.");
    });
}

function resetFieldValidation() {
  const fields = form.querySelectorAll(".form-control");
  fields.forEach(function (field) {
    field.classList.remove("invalid");
    field.classList.remove("valid");
  });
}
