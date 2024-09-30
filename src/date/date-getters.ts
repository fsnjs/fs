// prettier-ignore
export const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
export const daysOfWeekAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// prettier-ignore
export const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// prettier-ignore
export const monthsOfYearAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function getDayOfWeek(d_index: number) {
    return daysOfWeek[d_index];
}

export function getDayOfWeekAbbr(d_index: number) {
    return daysOfWeekAbbr[d_index];
}

export function getMonthOfYear(m_index: number) {
    return monthsOfYear[m_index];
}

export function getMonthOfYearAbbr(m_index: number) {
    return monthsOfYearAbbr[m_index];
}

export function getWeekOfYear(date = new Date()) {
    // Copy date so that we don't modify the original date
    const targetDate = new Date(date.getTime());

    // Set to nearest Thursday (current date + 4 - current day number)
    // Since Sunday is considered 0, this ensures the correct handling
    const dayNum = (targetDate.getDay() + 6) % 7;
    targetDate.setDate(targetDate.getDate() - dayNum + 3);

    // January 4th is always in week 1 (ISO 8601)
    const firstThursday = new Date(targetDate.getFullYear(), 0, 4);
    // @ts-ignore
    const diff = targetDate - firstThursday;

    // Calculate the week number
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return 1 + Math.floor(diff / oneWeek);
}

export function getQuarterOfYear(date = new Date()) {
    const month = date.getMonth();
    return Math.floor(month / 3) + 1;
}

export function getDayOfYear(date = new Date()) {
    const startOfYear = new Date(date.getFullYear(), 0, 1); // January 1st of the given year
    // @ts-ignore
    const diffInMs = date - startOfYear; // Difference in milliseconds
    const oneDayInMs = 1000 * 60 * 60 * 24; // Number of milliseconds in one day
    return Math.floor(diffInMs / oneDayInMs) + 1; // Add 1 since Jan 1st is the 1st day
}
