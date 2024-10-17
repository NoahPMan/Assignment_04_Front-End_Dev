document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('review-form').addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        
        let isValid = true;
        clearErrorMessages(); // Clear previous error messages

        // Validate username
        const username = document.getElementById('username');
        if (username.value.trim() === '') {
            isValid = false;
            showError(username, 'Name is required.');
        }

        // Validate rating
        const rating = document.querySelector('input[name="rating"]:checked');
        if (!rating) {
            isValid = false;
            showError(document.getElementById('rating-error'), 'Please select a rating.');
        }

        // Validate difficulty
        const difficulty = document.getElementById('difficulty');
        if (difficulty.value === '') {
            isValid = false;
            showError(difficulty, 'Difficulty selection is required.');
        }

        // Validate email
        const email = document.getElementById('email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email address.');
        }

        // If form is valid, you can submit or process the data
        if (isValid) {
            // Here you can handle the form submission
            console.log("Form submitted successfully!");
            // For now, we will just reset the form
            document.getElementById('review-form').reset();
        }
    });

    // Function to display error messages
    function showError(input, message) {
        const errorSpan = input.nextElementSibling; // Get the next span element for the error message
        if (errorSpan) {
            errorSpan.textContent = message; // Set the error message text
            errorSpan.classList.add('visible'); // Add a class to style the error
        }
    }

    // Clear existing error messages
    function clearErrorMessages() {
        const errorSpans = document.querySelectorAll('.error');
        errorSpans.forEach(span => {
            span.textContent = ''; // Clear the error message text
            span.classList.remove('visible'); // Remove any visible class for styling
        });
    }
});