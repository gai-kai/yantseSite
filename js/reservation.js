var defaultDate
const CUSTOMER = "yangtse"
const BASE_URL = "https://api.gaikai.xyz/"+CUSTOMER



const weekDayOpenMonday = [
    [18.00, 22.00]
]
const weekDayOpenTuesday = [
    [18.00, 22.00]
]
const weekDayOpenWednesday = [
    [12.00, 14.30],
    [18.00, 22.00]
]
const weekDayOpenThursday = [
    [12.00, 14.30],
    [18.00, 22.00]
]
const weekDayOpenFriday = [
    [12.00, 14.30],
    [18.00, 22.30]
]
const weekDayOpenSaturday = [
    [12.00, 22.30]
]
const weekDayOpenSunday = [
    [12.00, 22.00]
]

const weekDayOpenObjects = [
    weekDayOpenSunday,
    weekDayOpenMonday,
    weekDayOpenTuesday,
    weekDayOpenWednesday,
    weekDayOpenThursday,
    weekDayOpenFriday,
    weekDayOpenSaturday,
]




window.addEventListener('load', () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());



    document.getElementById('dateTimeReservation').value = now.toISOString().slice(0,16)
    defaultDate = today;
});


class Reservation {
    constructor(email,reservationDate, numberOfPeople, numberOfKids,  timestamp, phoneNumber, commentFromGuestUser, firstName, lastName,
                isBirthday, isRomanticDate, isWindowSeat ) {
        this.id = 0;
        this.guestUserID = email;
        this.reservationDate = reservationDate;
        this.numberOfPeople = numberOfPeople;
        this.numberOfKids = numberOfKids;
        this.haveArrived = false
        this.timestamp = timestamp;
        this.phoneNumber = phoneNumber;
        this.commentFromGuestUser = commentFromGuestUser;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = isBirthday;
        this.romanticDate = isRomanticDate;
        this.windowSeat = isWindowSeat;
        this.birthday = isBirthday;
        this.romanticDate = isRomanticDate;
        this.windowSeat = isWindowSeat;
    }


}

function checkIfStopped(){
    let url = BASE_URL+"/api/ReservationService/noAuth/stoppedByAdmin";
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        console.log(xhr.responseText)
        if(xhr.responseText==="true"){
            console.log("did it")
            document.getElementById("failure").style.display="block";
            document.getElementById("reservationForm").style.display = 'none'
        }
    }


}

function loadDefaultValuesReservation () {
    document.getElementById("numberOfKids").value = "0";
}
function wantNewsletter(){
    let url = BASE_URL+"/api/GuestUserService/noAuth/createUser/"+document.getElementById("newsletterInput").value;
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.send();
    xhr.onreadystatechange = function () {
        console.log(xhr.responseText)

        document.getElementById("newsletterConfirmation").style.display="block";
        document.getElementById("newsletter").style.display = 'none'

    }


}
checkIfStopped()
loadDefaultValuesReservation()

function displayInvalidTime() {
    document.getElementById("invalidTimeSign").style.display = "block"
    document.getElementById("agbCheck").checked = false
}

function checkTimeInput(){
    'use strict'
    let dateTimeElement = document.getElementById("dateTimeReservation")
    let dateTimeValue = new Date(dateTimeElement.value)
    let defaultDateTimeValue = new Date(defaultDate)
    if(dateTimeValue.getTime() === defaultDateTimeValue.getTime()) {
        displayInvalidTime()
        return false
    }
    let month = dateTimeValue.getMonth() +1
    if(month < 10)
        month = "0"+ month
    //2022-08-16T08:50


    let desiredDay = dateTimeValue.getDay();
    let desiredTime = dateTimeValue.getHours() + "." + dateTimeValue.getMinutes();

    if(isWeekdayToBook(desiredDay, desiredTime)) {
        document.getElementById("invalidTimeSign").style.display = "none"
        return true
    }
    else{
        displayInvalidTime()
        return false

    }


}

function isWeekdayToBook(weekDay, desiredTime){
    let weekDayOpenHour = weekDayOpenObjects[weekDay];
    for( let i = 0; i < weekDayOpenHour.length; i++){
        let startDate = weekDayOpenHour[i][0];
        let endDate = weekDayOpenHour[i][1];
        if(desiredTime >= startDate && desiredTime <= endDate)
            return true;
    }
    return false;
}


function makeReservation()
{
    if(checkIfInputFilled()) {
        loading(true);
        let url = BASE_URL + "/api/ReservationService/noAuth/" + document.getElementById("agbCheck").checked;
        console.log(url);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.responseText);
                var reservation = JSON.parse(xhr.responseText);
                console.log(reservation)
                if (reservation.id !== -1) {
                    loading(false);
                    makeSuccessVisible()

                }
            }
        };



        const guestUserID = document.getElementById("eMail").value;
        let reservationDate = document.getElementById("dateTimeReservation").value;
        let numberOfPeople = document.getElementById("numberOfPeople").value;
        let numberOfKids = document.getElementById("numberOfKids").value;
        const timestamp = "";
        let phoneNumber = document.getElementById("phoneNumber").value;
        let commentFromGuestUser = document.getElementById("commentFromUser").value;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let isBirthday = document.getElementById("isBirthday").checked;
        let isRomanticDate = document.getElementById("isRomanticDate").checked;
        let isWindowSeat = document.getElementById("isWindowSeat").checked;
        let reservation = null
        reservation = new Reservation(guestUserID, reservationDate, numberOfPeople, numberOfKids,
            timestamp, phoneNumber, commentFromGuestUser, firstName, lastName, isBirthday, isRomanticDate, isWindowSeat);
        let reservationJSON = JSON.stringify(reservation);
        xhr.send(reservationJSON);
    }


}

function loading(boolean){
    if(boolean){
        document.getElementById("loading").style.display = 'block'
        document.getElementById("reservationButton").style.display = 'none';
    }else{
        document.getElementById("loading").style.display = 'none'
    }

}


function makeReservationVisible() {
    var reservationButton = document.getElementById("reservationButton");

    if (checkIfInputFilled()) {
        reservationButton.style.display = 'block';
        reservationButton.style.marginTop = '4%'
        reservationButton.classList.add('btn_1','mx-auto');
    }else {
        reservationButton.style.display = 'none';
    }

}

function makeSuccessVisible(){
    document.getElementById("success").classList.remove('d-none')
    document.getElementById("reservationForm").classList.add('d-none')





}

function resetInvalidText(){
    document.getElementById("invalidInformation").style.display = 'none'
    document.getElementById("invalidTimeSign").style.display = 'none'
}

function checkIfInputFilled(){
    resetInvalidText()
    let numberOfFilledInputBox = 0;
    if(document.getElementById("eMail").value !== "")
        numberOfFilledInputBox++;
    if(document.getElementById("numberOfPeople").value !== "")
        numberOfFilledInputBox++;
    if(document.getElementById("numberOfKids").value !== "")
        numberOfFilledInputBox++;
    if(document.getElementById("phoneNumber").value !== "")
        numberOfFilledInputBox++;

    let timeCorrect = checkTimeInput()
    if(!timeCorrect){
        return false;
    }
    let isReservationValid = numberOfFilledInputBox >= 4 && document.getElementById("agbCheck").checked && timeCorrect
    if(!isReservationValid){
        showWarnText()
    }
    return isReservationValid

}

function showWarnText(){
    document.getElementById("invalidInformation").style.display = 'block'
}


window.addEventListener("cookieAlertAccept", function() {
    alert("cookies accepted")
})