(function(){
    emailjs.init("5rcemQjiw5ewrra4d"); // Replace with your EmailJS user ID
    
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            from_name: name,
            from_email: email,
            message_html: message
        };
        
        emailjs.send('service_y21mze4', 'template_50bdudl', templateParams) // Replace with your EmailJS service ID and template ID
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your message has been sent!');
                form.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('There was an error sending your message. Please try again later.');
            });
    });
})();
