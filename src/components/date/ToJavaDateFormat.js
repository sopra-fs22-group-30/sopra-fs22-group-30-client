/**
 * This is a helper function which helps to
 * convert the date(user inputs) to null or itself,
 * or "wrong date format"(if users input does not match "dd.MM.yyyy")
 **/

import regMatch from "components/date/regMatch";

const convertDateToJavaDateFormat = (str) => {

    const res = regMatch(str);

    if (str === "") {
        return null;
    }
    if (res) {
        return str;
    } else {
        return "wrong date format";
    }

}

export default convertDateToJavaDateFormat;