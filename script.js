document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("review-form");

    // Attach event listeners to clear errors when users interact with the form fields
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        input.addEventListener("input", function() {
            clearErrors(); // Clear errors upon user input
        });
    });

    // Handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        clearErrors(); // Clear any previous error messages

        // Validate each input field
        const isNameValid = isNotEmpty(document.getElementById("name").value, "name-error", "Name cannot be empty.");
        const isEmailValid = isValidEmail(document.getElementById("email").value);
        const isRatingValid = hasCheckedOption("rating", "rating-error", "Please select a rating.");
        const isGenreSelected = isSelected("genre", "genre-error", "Please select a genre.");

        // Validate that at least one checkbox is selected
        const featuresChecked = document.querySelectorAll('input[name="features"]:checked');
        const isFeaturesValid = featuresChecked.length > 0;
        if (!isFeaturesValid) {
            showError("features-error", "Please select at least one feature.");
        }

        // Submit the form if all validations pass
        if (isNameValid && isEmailValid && isRatingValid && isGenreSelected && isFeaturesValid) {
            form.submit(); // Trigger form submission
        }
    });

    // Function to clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(function(error) {
            error.textContent = ""; // Reset error messages
        });
    }

    // Function to display error messages
    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message; // Show specific error message
    }

    // Check if input is not empty
    function isNotEmpty(value, errorId, message) {
        if (value.trim() === "") {
            showError(errorId, message); // Show error if empty
            return false;
        }
        return true;
    }

    // Validate email format using regex
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            showError("email-error", "Please enter a valid email address."); // Show error for invalid format
            return false;
        }
        return true;
    }

    // Check if any radio button or checkbox is selected
    function hasCheckedOption(name, errorId, message) {
        const options = document.getElementsByName(name);
        const isChecked = Array.from(options).some(option => option.checked);
        if (!isChecked) {
            showError(errorId, message); // Show error if nothing selected
            return false;
        }
        return true;
    }

    // Check if an option in a dropdown is selected
    function isSelected(selectId, errorId, message) {
        const selectElement = document.getElementById(selectId);
        if (selectElement.value === "") {
            showError(errorId, message); // Show error if no option is selected
            return false;
        }
        return true;
    }
});