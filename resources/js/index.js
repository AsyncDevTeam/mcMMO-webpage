document.getElementById('submit-email').addEventListener('click', function () {
    var email = document.getElementById('newsletter').value;
    if (email) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'resources/php/newsletter.php?email=' + encodeURIComponent(email) + '&type=subscribe', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Successful request, show the result
                alert(xhr.responseText);
            } else {
                // There was an error
                alert('An error occurred, please try again');
            }
        };
        xhr.send();
    } else {
        // L'email est vide
        alert('Please enter a valid email');
    }
});