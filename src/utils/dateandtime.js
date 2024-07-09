
export function getDate(separator='/') {
    let newDate = new Date()

    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    // return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${(date < 10) ? ("0" + date) : date}`
    return `${(date < 10) ? ("0" + date) : date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
}

export function getTime(separator=':') {
    let newDate = new Date()

    let hour = newDate.getHours();
    let minute = newDate.getMinutes();
    let seconds = newDate.getSeconds();

    return `${(hour < 10) ? ("0" + hour) : hour}${separator}${(minute < 10) ? ("0" + minute) : minute}${separator}${(seconds < 10) ? ("0" + seconds) : seconds}`;

}

export function getDateAndTime() {
    return getDate() + " " + getTime();
}