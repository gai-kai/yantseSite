const BASE_URL = "https://server.gaikai.xyz:8888/api/GuestUserService/noAuth"
function deleteEmail() {
    "use strict";
    let emailform = document.getElementById('inputEmail');
    let email = emailform.value
    let xhr = new XMLHttpRequest();
    //xhr.open("DELETE", BASE_URL);
    //xhr.setRequestHeader("Content-Type", "text/plain")
    //xhr.send(email);
    let emailDiv = document.getElementById('emailDiv')
    emailDiv.style.display = 'none';
    let emailSuccess = document.getElementById("deleteSuccess")
    emailSuccess.classList.remove("d-none")


}