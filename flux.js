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

var chosen_month;
var possible_month;
var current_flux;

// set current month
function setMonths() {
    chosen_month = new Date().getMonth() + 1;
    possible_month = chosen_month;
    $(".month-item").text(months[chosen_month]);
}

function changeMonth(n) {
    if (n === 1) {
        $(".month-item").text(months[possible_month]);
        chosen_month = possible_month;
        var file_month = months[chosen_month].toLowerCase().substring(0,3);

        if (current_flux === "in") {
            var file_string = "incoming/in_"+file_month+"_2017.txt";
        } else {
            var file_string = "outgoing/out_"+file_month+"_2017.txt";
        }

        var ele = createNode(file_string);
        if (ele !== "failed") {
            var content = document.getElementById("flux_content");
            content.appendChild(ele);
        }
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
    current_flux = selected;

    $("#bottom_" + selected).removeClass("white_button").addClass("red_button");
    $("#bottom_" + unselect).removeClass("red_button").addClass("white_button");

    $("#topbar_" + selected).removeClass("white-text").addClass("pink-text");
    $("#topbar_" + unselect).removeClass("pink-text").addClass("white-text");

    document.getElementById(id.id).blur();
}
function createNode(file) {
    var node = document.createElement("div");

    var jqxhr = $.get(file, function(data) {
        var days = data.split("\n\n");
        for (var i = 0; i < days.length; i++) {
            var items = days[i].split("\n");
            var header = document.createElement("h3");
            header.appendChild(document.createTextNode(items[0]));

            var list = document.createElement("ul");
            list.setAttribute("style", "list-style-type: none");
            for (var j = 1; j < items.length; j++) {
                var list_item = document.createElement("li");
                list_item.appendChild(document.createTextNode(items[j]));
                list.appendChild(list_item);
            }
            node.appendChild(header);
            node.appendChild(list);
        }
    });

    if (jqxhr.statusText === "OK")
        return node;
    else
        return "failed";
}
