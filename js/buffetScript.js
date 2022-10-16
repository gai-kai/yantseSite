function changeDisplayFood (clickedButton) {
    makeAllDisplayNone();
    let buttonName = clickedButton.innerText
    switch(buttonName) {
        case "Warme Speisen":
            changeFoodSection("warm-items")
            break;
        case "Mongolischer Grill":
            changeFoodSection("teppanyaki")
            break;
        case "Sushi":
            changeFoodSection("sushi")
            break;
        case "Dessert":
            changeFoodSection("dessert")
            break;
        case "Salat-Theke":
            changeFoodSection("salad")
            break;
        default:
        // code block
    }

}


function makeAllDisplayNone () {
    let food_section = document.getElementById("food-Menu").children
    for(let i = 0; i < food_section.length; i++)
        food_section[i].style.display = "none"
}

function changeFoodSection (food_string) {

    document.getElementById(food_string).style.display = "block"
    document.getElementById(food_string).scrollIntoView();
}