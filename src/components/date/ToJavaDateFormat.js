/**
 * This is a helper function which helps to
 * convert the date(user inputs) to null or itself,
 * or "wrong date format"(if users input does not match "dd.MM.yyyy")
 **/

import regMatch from "components/date/regMatch";

const convertDateToJavaDateFormat = (str) => {

    if (str === null || str.match(/(^\s*$)/)) {
        return null;
    }
    const res = regMatch(str);
    console.log("res:",res)

    if (res) {
        return str;
    } else {
        return "wrong date format";
    }

}

export default convertDateToJavaDateFormat;