// Load in the in/out files and adjust lines accordingly.
// Change the value in yearMonths object:
// "feb" : "button-disabled" -> "button-month"

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

var yearMonths = {
  "jan" : "button-month",
  "feb" : "button-month",
  "mar" : "button-month",
  "apr" : "button-month",
  "may" : "button-month",
  "jun" : "button-month",
  "jul" : "button-month",
  "aug" : "button-month",
  "sep" : "button-month",
  "oct" : "button-month",
  "nov" : "button-disabled",
  "dec" : "button-disabled"
};

var date = new Date();
var chosen_month = 1;
var possible_month = 1;
var current_flux = "in";
var selectedYear = date.getFullYear();

// set current month
function setMonths() {
  chosen_month = date.getMonth() + 1;
  possible_month = chosen_month;
  $(".month-item").text(months[chosen_month]);
  changeMonth(1);
  setupMonths({});
}

function changeMonth(n) {  
  if (n === 1) {
    $(".month-item").text(months[possible_month]);
    chosen_month = possible_month;
    var file_month = months[chosen_month].toLowerCase().substring(0, 3);
    // console.log(file_month);

    if (current_flux === "in") {
      var file_string =
        "https://raw.githubusercontent.com/Davatata/netflux/master/" +
        selectedYear + "/incoming/in_" + file_month + "_" + selectedYear + ".txt";
    } else {
      var file_string =
        "https://raw.githubusercontent.com/Davatata/netflux/master/" +
        selectedYear + "/outgoing/out_" + file_month + "_" + selectedYear + ".txt";
    }
    
    var ele = createNode(file_string);
    // console.log(file_string);
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

function pickMonth(n, classMonth) {
  if (classMonth === 'button-disabled') {
    possible_month = date.getMonth() + 1;
  }
  else if (n) {
    possible_month = n;
  }
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
  // console.log(file);
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

      // console.log(node);
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

function setupMonths(year) {
  if (!year) {
    year = new Date().getFullYear();
  }

  let monthHtml = 
  `<div class="row text-center">
    <div id="" class="small-4 columns no-padding"><button id="janButton" class=${yearMonths["jan"]} type="button" month="1" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Jan</button></div>
    <div id="" class="small-4 columns no-padding"><button id="febButton" class=${yearMonths["feb"]} type="button" month="2" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Feb</button></div>
    <div id="" class="small-4 columns no-padding"><button id="marButton" class=${yearMonths["mar"]} type="button" month="3" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Mar</button></div>
  </div>
  <div class="row text-center">
    <div id="" class="small-4 columns no-padding"><button id="aprButton" class=${yearMonths["apr"]} type="button" month="4" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Apr</button></div>
    <div id="" class="small-4 columns no-padding"><button id="mayButton" class=${yearMonths["may"]} type="button" month="5" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">May</button></div>
    <div id="" class="small-4 columns no-padding"><button id="junButton" class=${yearMonths["jun"]} type="button" month="6" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Jun</button></div>
  </div>
  <div class="row text-center">
    <div id="" class="small-4 columns no-padding"><button id="julButton" class=${yearMonths["jul"]} type="button" month="7" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Jul</button></div>
    <div id="" class="small-4 columns no-padding"><button id="augButton" class=${yearMonths["aug"]} type="button" month="8" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Aug</button></div>
    <div id="" class="small-4 columns no-padding"><button id="sepButton" class=${yearMonths["sep"]} type="button" month="9" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Sep</button></div>
  </div>
  <div class="row text-center">
    <div id="" class="small-4 columns no-padding"><button id="octButton" class=${yearMonths["oct"]} type="button" month="10" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Oct</button></div>
    <div id="" class="small-4 columns no-padding"><button id="novButton" class=${yearMonths["nov"]} type="button" month="11" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Nov</button></div>
    <div id="" class="small-4 columns no-padding"><button id="decButton" class=${yearMonths["dec"]} type="button" month="12" onclick="pickMonth(this.getAttribute('month'), this.getAttribute('class'))">Dec</button></div>
  </div>
  <hr/>
  <div class="button-group float-right">
    <a class="button rounded secondary round-button" href="#" style="margin-right: 1em" onclick="changeMonth(0)">Cancel</a>
    <a class="button rounded success round-button" href="#" onclick="changeMonth(1)">Update</a>
  </div>`;
  document.getElementById("month_wrapper").innerHTML = monthHtml;
}