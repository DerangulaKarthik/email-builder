// Handle Save Button
document.getElementById('saveButton').addEventListener('click', function() {
    const emailData = {
        subject: document.querySelector('.header-title').textContent,
        body: document.querySelector('.editable-text').innerHTML,
        quote: document.querySelector('.quote').innerHTML,
        imageUrl: document.getElementById('imagePreview').src
    };

    // Send data to the backend via POST
    fetch('/api/email/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
    })
    .then(response => response.json())
    .then(data => alert('Email saved successfully!'))
    .catch(error => console.error('Error saving email:', error));
});
