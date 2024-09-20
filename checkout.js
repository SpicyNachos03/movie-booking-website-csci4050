document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const name = document.getElementById('name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    // Basic validation (you can enhance it further)
    if (name && cardNumber && expiry && cvv) {
        // Show success message
        document.getElementById('success-message').classList.remove('hidden');

        // Hide the form
        document.getElementById('checkout-form').classList.add('hidden');
    } else {
        alert('Please fill in all fields.');
    }
});
