function setToast(type, text, timer){
    let options_toast
    if(timer !== 0){
        options_toast = {
            toast: true,
            position: 'bottom-right',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            showCloseButton:true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }
    }else{
        options_toast = {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton:true,
        }
    }
    const Toast = Swal.mixin(options_toast)
    Toast.fire({
        icon: type,
        title: text,
    })
}

document.getElementById('submit-email').addEventListener('click', function () {
    var email = document.getElementById('newsletter').value;
    if (email) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'resources/php/newsletter.php?email=' + encodeURIComponent(email) + '&type=subscribe', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Successful request, show the result
                const output = xhr.responseText;
                const type = output.split(': ')[0]
                const text = output.split(': ')[1]
                setToast(type, text, 10000);
            } else {
                // There was an error
                setToast('error', "An error occured, please try again.", 10000);
            }
        };
        xhr.send();
    } else {
        // L'email est vide
        setToast('error', "Please enter a valid email.", 10000);
    }
});