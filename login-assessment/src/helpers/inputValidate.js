// Validate email input
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        );
};

// Validate phone input
export const validatePhone = (phone) => {
    return String(phone)
        .match(
            /^[0-9\-\+]{10}$/
        );
};

// Convert date
export const convertDate = (dateString) => {

    const parts = dateString.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    return mydate.toDateString();
};
