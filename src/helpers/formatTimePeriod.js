import formatDate from "./formateDate";

export default function formatTimePeriod(startDate, endDate) {
    return ' (' + formatDate(startDate) + " - " + (endDate ? formatDate(endDate) : "obecnie") + ')';
}