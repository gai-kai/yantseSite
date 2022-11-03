const CUSTOMER = "yangtse"
const BASE_URL = "https://api.gaikai.xyz/"+CUSTOMER
function deleteEmail() {
    "use strict";
    let emailform = document.getElementById('inputEmail');
    let path = BASE_URL+"/api/GuestUserService/noAuth"
    let email = emailform.value
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", path);
    xhr.setRequestHeader("Content-Type", "text/plain")
    xhr.send(email);
    let emailDiv = document.getElementById('emailDiv')
    emailDiv.style.display = 'none';
    let emailSuccess = document.getElementById("deleteSuccess")
    emailSuccess.classList.remove("d-none")

}