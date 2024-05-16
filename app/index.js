import document from "document";

import * as simpleClock from "./simple/clock";
import * as simpleBattery from "./simple/battery";

let txtBattery = document.getElementById("txtBattery");
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

  if (data.rawTime.getSeconds() == 0) {
    let reading = simpleBattery.getReading();
    txtBattery.text = (reading.charging ? "CHR " : "") + reading.level + "%";
  }
}

simpleClock.initialize("seconds", clockCallback);
