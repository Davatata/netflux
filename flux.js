var months = {
    "1":"January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December" };

var chosen_month = new Date().getMonth() + 1;
var possible_month = chosen_month;

// set current month
function setMonths() {
    $(".month-item").text(months[chosen_month]);
}

function changeMonth(n) {

    if (n === 1) {
        $(".month-item").text(months[possible_month]);
        chosen_month = possible_month;
    } else {
        possible_month = chosen_month;
    }

    $('button.close-button').trigger('click');
}

function pickMonth(n) {
    possible_month = n;
}
// when certian button (in or out) is clicked, toggle backgrounds
function flux_click(id) {
    var selected = id.id.split("_")[1];
    var unselect = selected === "in" ? "out" : "in";

    $("#bottom_" + selected).removeClass("white_button").addClass("red_button");
    $("#bottom_" + unselect).removeClass("red_button").addClass("white_button");

    $("#topbar_" + selected).removeClass("white-text").addClass("pink-text");
    $("#topbar_" + unselect).removeClass("pink-text").addClass("white-text");

    document.getElementById(id.id).blur();
}
