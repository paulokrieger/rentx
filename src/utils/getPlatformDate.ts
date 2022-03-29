//no iOS ele retorna a data -1
import { addDays } from "date-fns";
import { Platform } from "react-native";

export function getPlatformDate(date: Date) {
  if (Platform.OS === "ios") {
    return addDays(date, -1);
  } else {
    return date;
  }
}
