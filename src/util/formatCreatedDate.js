
function formateCreatedDate(unstructureDate) {
    return new Date(unstructureDate).toLocaleString("en-US", {
        year: "numeric",
        month: "short", //2-digit
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // 12-hour clock with AM/PM
    });
}

export default formateCreatedDate