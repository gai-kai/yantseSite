/* Edit Reservation*/
const CUSTOMER = "yangtse"
const BASE_URL = "https://api.gaikai.xyz/"+CUSTOMER


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get('email');
const uuid = urlParams.get('uuid');
class EditReservation {
    constructor(uuid,email, lastName, phoneNumber, reservationDate, numberOfPeople, numberOfKids, commentFromGuestUser, birthday, romanticDate,windowSeat) {
        this.uuid=uuid
        this.reservationDate = reservationDate;
        this.numberOfPeople = numberOfPeople;
        this.numberOfKids = numberOfKids;
        this.commentFromGuestUser = commentFromGuestUser;
        this.phoneNumber = phoneNumber;
        this.email = email
        this.lastName = lastName;
        this.birthday = birthday;
        this.romanticDate = romanticDate;
        this.windowSeat = windowSeat;
    }
}
window.onload = function() {
    checkIfAuthorized();
    // var getInput = prompt("Hey type something here: ");


}
function setFocusToSuccessBox(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function editReservation(){

    let url = BASE_URL + "/api/ReservationService/noAuth/edit"
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        console.log(xhr.responseText);
        var success = xhr.responseText;


            editingSuccessfull(true);




    };


    let reservationDate = document.getElementById("dateTimeReservation").value;
    let numberOfPeople = document.getElementById("numberOfPeople").value;
    let numberOfKids = document.getElementById("numberOfKids").value;
    let commentFromGuestUser = document.getElementById("comment").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let lastName = document.getElementById("lastName").value;
    let birthday = document.getElementById("birthday").checked;
    let romanticDate = document.getElementById("romanticDate").checked;
    let windowSeat = document.getElementById("windowSeat").checked;
    let email = document.getElementById("email").value;

    let reservation = new EditReservation(uuid, email, lastName, phoneNumber, reservationDate, numberOfPeople, numberOfKids,
        commentFromGuestUser,birthday,romanticDate,windowSeat);
    let reservationJSON = JSON.stringify(reservation);
    xhr.send(reservationJSON);

}

var form = document.getElementById("edit_res_form");
function handleForm(event) { event.preventDefault(); }

form.addEventListener('submit', handleForm);

function editingSuccessfull(isEditSuccess){
    //Whatever happens Button for edit reservation will disappear
    document.getElementById("reservationButton").style.display = 'none'
    if(!isEditSuccess){
        document.getElementById("success").style.display = 'none'
        document.getElementById("invalidEdit").style.display = 'block'
    }else{
        document.getElementById("reservationComplete").classList.remove("d-none")

    }


}

function checkIfAuthorized(){

    var reservation="";


    let url = BASE_URL + "/api/ReservationService/noAuth/" +email+"/"+uuid;
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");



    xhr.onreadystatechange = function () {

        console.log(xhr.responseText);
        var reservation = JSON.parse(xhr.responseText);
        console.log("Reservation*:")
        console.log(reservation.email)
        console.log("value");

        document.getElementById("dateTimeReservation").value = reservation.reservationDate;
        console.log("dto:");

        document.getElementById("email").value = reservation.email
        document.getElementById("lastName").value =reservation.lastName;
        document.getElementById("phoneNumber").value =reservation.phoneNumber;
        document.getElementById("numberOfKids").value =reservation.numberOfKids;
        document.getElementById("numberOfPeople").value = reservation.numberOfPeople;
        document.getElementById("comment").value = reservation.commentFromGuestUser;
        document.getElementById("birthday").checked = reservation.birthday;
        document.getElementById("romanticDate").checked = reservation.romanticDate;
        document.getElementById("windowSeat").checked = reservation.windowSeat;




    };
    xhr.send();
    console.log(localStorage.getItem("reservation"));


}
