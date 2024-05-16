import document from "document";

import * as simpleClock from "./simple/clock";

let txtDay = document.getElementById("txtDay");
let txtTimeHours = document.getElementById("txtTimeHours");
let txtTimeMins = document.getElementById("txtTimeMins");
let txtTimeSecs = document.getElementById("txtTimeSecs");
let txtDate = document.getElementById("txtDate");

/* --------- CLOCK ---------- */
function clockCallback(data) {
  txtDay.text = data.day;
  txtTimeHours.text = data.hours;
  txtTimeMins.text = data.minutes;
  txtTimeSecs.text = data.seconds;
  txtDate.text = data.date;
}

simpleClock.initialize("seconds", clockCallback);
