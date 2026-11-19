document.addEventListener("DOMContentLoaded", function () {
  // --- Contact Form Handling ---
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent default page reload

      // Basic Validation (HTML5 does most of it, this is a fallback)
      const phone = form.querySelector('input[name="phone"]').value;
      if (phone.length !== 10 || isNaN(phone)) {
        showMessage(
          "Please enter a valid 10-digit phone number.",
          "text-danger",
        );
        return;
      }

      // Change button state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
      submitBtn.disabled = true;

      // IMPORTANT: To make this work securely, you need a Formspree account.
      // 1. Go to https://formspree.io/ and create a free account.
      // 2. Create a new form. It will give you a URL like https://formspree.io/f/xyzabcde
      // 3. Replace 'YOUR_FORMSPREE_ID' in the HTML <form action="..."> with your actual ID.

      // Simulating an API call for demonstration purposes.
      // In reality, the browser will automatically submit this to Formspree.
      setTimeout(() => {
        // This block simulates a successful response
        showMessage(
          "Thank you! Your request has been sent. We will contact you shortly.",
          "text-success",
        );
        form.reset();

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);

      /* 
            -- ACTUAL FORM SUBMISSION CODE (Uncomment when Formspree is set up) --
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showMessage('Thank you! Your request has been sent. We will contact you shortly.', 'text-success');
                    form.reset();
                } else {
                    showMessage('Oops! There was a problem submitting your form.', 'text-danger');
                }
            }).catch(error => {
                showMessage('Oops! There was a problem submitting your form.', 'text-danger');
            }).finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
            */
    });
  }

  // Helper function to show form messages
  function showMessage(msg, className) {
    formMessage.textContent = msg;
    formMessage.className = `mt-3 text-center fw-bold ${className}`;

    // Clear message after 5 seconds
    setTimeout(() => {
      formMessage.textContent = "";
    }, 5000);
  }
});
