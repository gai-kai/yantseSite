/* Edit Reservation*/
const CUSTOMER = "yangtse"
const BASE_URL = "https://api.gaikai.xyz/"+CUSTOMER

window.onload = function() {
    cancelReservation();
    // var getInput = prompt("Hey type something here: ");


}


function cancelReservation(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    const uuid = urlParams.get('uuid');

    let url = BASE_URL + "/api/ReservationService/noAuth/cancel/" +email+"/"+uuid;
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");


    xhr.onreadystatechange = function () {

    };
    xhr.send();


}