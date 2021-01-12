import "react-native";
import { dateToString } from "../src/network";

// Snapshot tests

it("converts dates to the correct strings", () => {
    const date1 = new Date("April 10, 1996");
    expect(dateToString(date1)).toEqual("10/4/1996");
    const date2 = new Date("December 4, 2025");
    expect(dateToString(date2)).toEqual("4/12/2025");
});