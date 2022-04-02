/**
 * This is a helper function which helps to
 * convert Java date format to itself or "" (instead of null).
 **/
const convertDateToSwissDateFormat = (str) => {

    if (str === "null") {
        return "";
    }
    return (str);
}

export default convertDateToSwissDateFormat;