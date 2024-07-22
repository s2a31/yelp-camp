(function () {
    'use strict'; // Enable strict mode to catch common errors and "unsafe" actions

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validated-form'); // Select all forms with the class 'validated-form'

    // Loop over each form and prevent submission if the form is not valid
    Array.from(forms).forEach(function (form) { // Convert NodeList to Array and iterate over each form
        form.addEventListener(
            'submit', // Add a submit event listener to each form
            function (event) {
                if (!form.checkValidity()) { // Check if the form is valid
                    event.preventDefault(); // Prevent form submission if not valid
                    event.stopPropagation(); // Stop the event from propagating further
                }

                form.classList.add('was-validated'); // Add Bootstrap validation class to the form
            },
            false // Use capture phase
        );
    });
})();
