document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("review-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Clear previous error messages
        clearErrors();

        let hasErrors = false;

        // Validate name
        const username = document.getElementById("username").value.trim();
        if (username === "") {
            showError("name-error", "Please enter your name.");
            hasErrors = true;
        }

        // Validate rating
        const rating = document.querySelector('input[name="rating"]:checked');
        if (!rating) {
            showError("rating-error", "Please select a rating.");
            hasErrors = true;
        }

        // Validate checkbox group (likes)
        const likes = document.querySelectorAll('input[name="likes"]:checked');
        if (likes.length === 0) {
            showError("likes-error", "Please select at least one like option.");
            hasErrors = true;
        }

        // Validate difficulty
        const difficulty = document.getElementById("difficulty").value;
        if (difficulty === "") {
            showError("difficulty-error", "Please select a difficulty level.");
            hasErrors = true;
        }

        // Validate email
        const email = document.getElementById("email").value.trim();
        if (email === "") {
            showError("email-error", "Please enter your email.");
            hasErrors = true;
        } else if (!validateEmail(email)) {
            showError("email-error", "Please enter a valid email address.");
            hasErrors = true;
        }

        // If no errors, submit the form using fetch
        if (!hasErrors) {
            const formData = new FormData(form);
            fetch(form.action, {
                method: form.method,
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                    alert("Form submitted successfully!");
                    form.reset(); // Reset form after submission
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred while submitting the form.");
                });
        }
    });

    // Function to show error messages
    function showError(errorId, message) {
        const errorSpan = document.getElementById(errorId);
        errorSpan.textContent = message;
        errorSpan.style.display = "block"; // Show the error message
    }

    // Function to clear previous error messages
    function clearErrors() {
        const errorSpans = document.querySelectorAll(".error");
        errorSpans.forEach(span => {
            span.textContent = "";
            span.style.display = "none"; // Hide error messages
        });
    }

    // Function to validate email format
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});