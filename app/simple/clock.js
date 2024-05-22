/*
  A simple clock which renders the current time and date in a digital format.
  Callback should be used to update your UI.
*/
import clock from "clock";
import { preferences } from "user-settings";

import { days, shortDays } from "./locales/en.js";
import * as util from "./utils";
import * as common_util from "../../common/util";

let clockCallback;

export function initialize(granularity, callback) {
  clock.granularity = granularity;
  clockCallback = callback;
  clock.addEventListener("tick", tickHandler);
}

function tickHandler(evt) {
  clockCallback(calculateDataFromDate(evt.date));
}

function calculateDataFromDate(today) {
  let year = today.getFullYear();
  let month = util.zeroPad(today.getMonth() + 1);
  let dayNumber = util.zeroPad(today.getDate());
  let dateString = `${year}-${month}-${dayNumber}`;
  let shortDateString = `${month}-${dayNumber}`;

  return {
    day: days[today.getDay()],
    shortDay: shortDays[today.getDay()],
    hours: common_util.monoDigits(util.zeroPad(today.getHours())),
    minutes: common_util.monoDigits(util.zeroPad(today.getMinutes())),
    seconds: common_util.monoDigits(util.zeroPad(today.getSeconds()-today.getSeconds()%10)),
    date: dateString,
    shortDate: shortDateString,
    rawTime: today,
  }
}
