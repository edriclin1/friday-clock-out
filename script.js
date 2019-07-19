let mon, tues, wed, thurs, inTime, outLunch, inLunch, outTime;
let requiredHours = 40;

window.onload = function () {
    mon = document.getElementById("mon");
    tues = document.getElementById("tues");
    wed = document.getElementById("wed");
    thurs = document.getElementById("thurs");
    inTime = document.getElementById("inTime");
    outLunch = document.getElementById("outLunch");
    inLunch = document.getElementById("inLunch");
    outTime = document.getElementById("clockOutTime");

    mon.addEventListener("change", function () { validate(mon) });
    tues.addEventListener("change", function () { validate(tues) });
    wed.addEventListener("change", function () { validate(wed) });
    thurs.addEventListener("change", function () { validate(thurs) });
    inTime.addEventListener("change", function () { validate(inTime) });
    outLunch.addEventListener("change", function () { validate(outLunch) });
    inLunch.addEventListener("change", function () { validate(inLunch) });
}

function validate(element) {

    outLunch.min = inTime.value;
    inLunch.min = outLunch.value;

    if (!element.checkValidity()) {
        toggleDanger(element, 1);
        return;
    }

    toggleDanger(element, 0);
    updateTime();
}

function updateTime() {

    var currentHours =
        parseFloat(mon.value) +
        parseFloat(tues.value) +
        parseFloat(wed.value) +
        parseFloat(thurs.value);

    var lunchHours = 0;
    if (outLunch.value != "" && inLunch.value != "")
        lunchHours = diff(outLunch.value, inLunch.value);

    var remainingHours = requiredHours - currentHours + lunchHours;

    var inTimeH = parseInt(inTime.value.substring(0, 2));
    var inTimeM = parseInt(inTime.value.substring(3, 5));
    var outTimeH = Math.floor(inTimeH + remainingHours);
    var outTimeM = Math.floor(inTimeM + remainingHours % 1 * 60);
    var outTimeAmPm = ((inTimeH > 12) || (inTimeH == 12 && outTimeM > 0)) ? "PM" : "AM";

    if (outTimeM > 59) {
        outTimeH += outTimeM / 60;
        outTimeM = outTimeM % 60;
    }

    if (outTimeH > 12) {
        outTimeH = outTimeH % 12;
        outTimeAmPm = (outTimeAmPm == "AM") ? "PM" : "AM";
    }

    outTime.innerHTML = checkForPad(Math.floor(outTimeH)) + ":" + checkForPad(Math.floor(outTimeM)) + " " + outTimeAmPm;
}

function diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    return hours + minutes / 60;
}

function checkForPad(val) {
    if (parseInt(val) < 10) {
        val = "0" + val.toString();
        return val;
    } else {
        val = val.toString();
        return val;
    }
}

function toggleDanger(element, toggleTo) {
    if (element.classList.contains("is-danger") && toggleTo == 0) {
        element.classList.remove("is-danger");
    } else if (!element.classList.contains("is-danger") && toggleTo == 1) {
        element.classList.add("is-danger");
    }
}