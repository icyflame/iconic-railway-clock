import document from "document";

import * as simpleClock from "./simple/clock";

let txtBattery = document.getElementById("txtBattery");
let txtDay = document.getElementById("txtDay");
let txtTimeHours = document.getElementById("txtTimeHours");
let txtTimeMins = document.getElementById("txtTimeMins");
let txtTimeSecs = document.getElementById("txtTimeSecs");
let txtDate = document.getElementById("txtDate");
let aodActive = false;

/* --------- CLOCK ---------- */
function clockCallback(data) {
  if (aodActive) {
    txtDay.text = data.shortDay;
    txtDate.text = data.shortDate;
  } else {
    txtDay.text = data.day;
    txtDate.text = data.date;
  }

  txtTimeHours.text = data.hours;
  txtTimeMins.text = data.minutes;
  txtTimeSecs.text = data.seconds;
}

simpleClock.initialize("seconds", clockCallback);

/* --------- BATTERY --------- */
import { battery } from "power";
battery.addEventListener("change", function (this, evt) {
  if (aodActive) {
    txtBattery.text = "";
    return;
  }
  txtBattery.text = (battery.charging ? "CHR " : "") + battery.chargeLevel + "%";
});

/* ---------- ALWAYS-ON DISPLAY ---------- */

// Reference code:
// https://dev.fitbit.com/blog/2019-12-19-announcing-fitbit-os-sdk-4.1/
import { clock } from "clock";
import { me } from "appbit";
import { display } from "display";
if (display.aodAvailable && me.permissions.granted("access_aod")) {
  display.aodAllowed = true;
  display.addEventListener("change", () => {
    if (display.aodActive) {
      aodActive = true;
      clock.granularity = "minutes";
    } else if (display.on) {
      aodActive = false;
      clock.granularity = "seconds";
    }
  });
}
