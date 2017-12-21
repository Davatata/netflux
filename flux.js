// Load in the in/out files and adjust lines accordingly.
// Change ( class="button-disabled" month="0" ) to 
//  ( class="button-month" month="8") : here 8 represents August
//  so change according to month (1-12)

var months = {
  "1": "January",
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
  "12": "December"
};


var date = new Date();
var chosen_month;
var possible_month;
var current_flux = "in";
var currentYear = date.getFullYear();

// set current month
function setMonths() {
  chosen_month = date.getMonth() + 1;
  possible_month = chosen_month;
  $(".month-item").text(months[chosen_month]);
  changeMonth(1);
}

function changeMonth(n) {
  if (n === 1) {
    $(".month-item").text(months[possible_month]);
    chosen_month = possible_month;
    var file_month = months[chosen_month].toLowerCase().substring(0, 3);
    console.log(file_month);

    if (current_flux === "in") {
      var file_string =
        "https://raw.githubusercontent.com/Davatata/netflux/master/" +
        currentYear + "/incoming/in_" + file_month + "_" + currentYear + ".txt";
    } else {
      var file_string =
        "https://raw.githubusercontent.com/Davatata/netflux/master/" +
        currentYear + "/outgoing/out_" + file_month + "_" + currentYear + ".txt";
    }

    var ele = createNode(file_string);
    console.log(file_string);
    var parent = document.getElementById("parent_node");
    var content = document.getElementById("flux_content");
    ele.id = "flux_content";
    ele.className = "white-background";
    parent.replaceChild(ele, content);

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

  $("#topbar_" + selected).removeClass("white-text").addClass("black-text");
  $("#topbar_" + unselect).removeClass("black-text").addClass("white-text");
  changeMonth(1);
  document.getElementById(id.id).blur();
}

function createNode(file) {
  console.log(file);
  var node = document.createElement("div");

  var jqxhr = $.get(file, function (data) { })
    .done(function (data) {
      var days = data.split(/\n/);
      let test_array = [];
      for (let i = 0; i < days.length; i++) {
        test_array.push(days[i]);
        var header = document.createElement("h3");
        header.appendChild(document.createTextNode(days[i]));
        header.setAttribute("class", "date-header");
        var list = document.createElement("ul");
        i++;
        while (i < days.length && (days[i].length > 2)) {
          var list_item = document.createElement("li");
          list_item.appendChild(document.createTextNode(days[i]));
          list.appendChild(list_item);
          i++;
        }
        node.appendChild(header);
        node.appendChild(list);
      }

      console.log(node);
    })
    .fail(function (data) {
      var bad = document.createElement("h4");
      bad.appendChild(document.createTextNode("Coming Soon."));
      node.appendChild(bad);
    });

  return node;
}

function showAbout() {
  document.getElementById("flux_content").style.display = "none";
  document.getElementById("about_content").style.display = "block";
}

function showFlux() {
  document.getElementById("flux_content").style.display = "block";
  document.getElementById("about_content").style.display = "none";
}
