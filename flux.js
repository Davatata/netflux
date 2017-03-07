// when certian button (in or out) is clicked, toggle backgrounds
function flux_click(id) {
    var in_button = document.getElementById("bottom_in");
    var out_button = document.getElementById("bottom_out");
    in_button.style.backgroundColor = "white";
    out_button.style.backgroundColor = "white";
    in_button.style.color = "red";
    out_button.style.color = "red";
    $(id).css("background-color", "red");
    $(id).css("color", "white");
    document.getElementById(id.id).blur();
}
