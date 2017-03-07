// when certian button (in or out) is clicked, toggle backgrounds
function flux_click(id) {
    var selected = id.id.split("_")[1];
    var unselect = selected === "in" ? "out" : "in";

    $("#bottom_" + selected).removeClass("white_button").addClass("red_button");
    $("#bottom_" + unselect).removeClass("red_button").addClass("white_button");

    $("#topbar_" + selected).removeClass("white-text").addClass("black-text");
    $("#topbar_" + unselect).removeClass("black-text").addClass("white-text");

    document.getElementById(id.id).blur();
}
