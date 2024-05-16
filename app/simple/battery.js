import { battery, charger } from "power";

export function getReading () {
  return {
    level: Math.floor(battery.chargeLevel),
    charging: charger.connected,
  };
}
