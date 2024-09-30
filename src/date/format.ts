import {
    getDayOfWeek,
    getDayOfWeekAbbr,
    getDayOfYear,
    getMonthOfYear,
    getMonthOfYearAbbr,
    getQuarterOfYear,
    getWeekOfYear
} from './date-getters.js';

function pad(val: number) {
    return `${val < 10 ? '0' + val : val}`;
}

function padThree(val: number) {
    return val > 100 ? `${val}` : val > 10 ? `0${val}` : `00${val}`;
}

function $coerce(val: string | number) {
    return `${val}`;
}

/**
 * Formats a given date and a format string.
 *
 * ### Date/Time Formatting Flags:
 *
 * **Hours**:
 *
 * - `H`: 24-hour format without leading zeros (0-23)
 * - `HH`: 24-hour format with leading zeros (00-23)
 * - `h`: 12-hour format without leading zeros (1-12)
 * - `hh`: 12-hour format with leading zeros (01-12)
 *
 * **Minutes**:
 *
 * - `m`: Minutes without leading zeros (0-59)
 * - `mm`: Minutes with leading zeros (00-59)
 * - **Seconds**:
 * - `s`: Seconds without leading zeros (0-59)
 * - `ss`: Seconds with leading zeros (00-59)
 *
 * **Milliseconds**:
 *
 * - `S`: Tenths of a second (0-9)
 * - `SS`: Hundredths of a second (00-99)
 * - `SSS`: Thousandths of a second (000-999)
 *
 * **AM/PM**:
 *
 * - `A`: Uppercase AM/PM (AM, PM)
 * - `a`: Lowercase am/pm (am, pm)
 *
 * **Timezone**:
 *
 * - `Z`: Offset from UTC (e.g., +05:00, -03:00)
 * - `ZZ`: Offset from UTC without a colon (e.g., +0500, -0300)
 * - `z`: Abbreviated timezone name (e.g., EST, CST)
 *
 * **Year**:
 *
 * - `YYYY`: Four-digit year (e.g., 2023)
 * - `YY`: Two-digit year (e.g., 23 for 2023)
 *
 * **Month**:
 *
 * - `M`: Month number without leading zeros (1-12)
 * - `MM`: Month number with leading zeros (01-12)
 * - `MMM`: Abbreviated month name (e.g., Jan, Feb)
 * - `MMMM`: Full month name (e.g., January, February)
 *
 * **Day**:
 *
 * - `D`: Day of the month without leading zeros (1-31)
 * - `DD`: Day of the month with leading zeros (01-31)
 * - `ddd`: Abbreviated day name (e.g., Mon, Tue)
 * - `dddd`: Full day name (e.g., Monday, Tuesday)
 *
 * **Other**:
 *
 * - `DDD`: Day of the year without leading zeros (1-365)
 * - `DDDD`: Day of the year with leading zeros (001-365)
 * - `W`: Week of the year (1-52)
 * - `Q`: Quarter of the year (1-4)
 *
 * @param date
 * @param format
 */
export function formatDate(date: Date, format: string) {
    type Coerce = (val: any) => string;

    function replace(
        searchVal: string | RegExp,
        value: string | number,
        coerce: Coerce = $coerce
    ) {
        format = format.replace(searchVal, coerce(value));
    }

    function amPm(upper = true) {
        let a = date.getHours() < 12 ? 'am' : 'pm';
        return upper ? a.toUpperCase() : a;
    }

    /** Lowercase am/pm (am, pm) **/
    replace(/a/g, amPm(false));
    /** Uppercase AM/PM (AM, PM) **/
    replace(/a/g, amPm(true));
    /** Seconds with leading zeros (00-59) **/
    replace(/ss/g, date.getSeconds(), pad);
    /** Seconds without leading zeros (0-59) **/
    replace(/s/g, date.getSeconds());
    /** Minutes with leading zeros (00-59) **/
    replace(/mm/g, date.getMinutes(), pad);
    /** Minutes without leading zeros (0-59) **/
    replace(/m/g, date.getMinutes());
    /** 12-hour format with leading zeros (01-12) **/
    replace(/hh/g, date.getHours(), pad);
    /** 12-hour format without leading zeros (1-12) **/
    replace(/h/g, date.getHours());
    /** Full day name (e.g., Monday, Tuesday) **/
    replace(/dddd/, date.getDay(), getDayOfWeek);
    /** Abbreviated day name (e.g., Mon, Tue) **/
    replace(/ddd/, date.getDay(), getDayOfWeekAbbr);
    /** Four-digit year (e.g., 2023) **/
    replace(/YYYY/, date.getFullYear());
    /** Two-digit year (e.g., 23 for 2023) **/
    replace(/YY/, `${date.getFullYear()}`.substring(2));
    /** Week of the year (1-52) **/
    replace(/W/, getWeekOfYear(date));
    /** Thousandths of a second (000-999) **/
    replace(/SSS/, date.getMilliseconds());
    /** Hundredths of a second (00-99) **/
    replace(/SS/, Math.floor(date.getMilliseconds() / 10) % 10);
    /** Tenths of a second (0-9) **/
    replace(/S/, Math.floor(date.getMilliseconds() / 100));
    /** Quarter of the year (1-4) **/
    replace(/S/, getQuarterOfYear(date));
    /** Full month name (e.g., January, February) **/
    replace(/MMMM/, getMonthOfYear(date.getMonth()));
    /** Abbreviated month name (e.g., Jan, Feb) **/
    replace(/MMM/, getMonthOfYearAbbr(date.getMonth()));
    /** Month number with leading zeros (01-12) **/
    replace(/MM/, date.getMonth(), pad);
    /** Month number without leading zeros (1-12) **/
    replace(/M/, date.getMonth());
    /** 24-hour format with leading zeros (00-23) **/
    replace(/HH/, date.getHours(), pad);
    /** 24-hour format without leading zeros (0-23) **/
    replace(/H/, date.getHours());
    /** Day of the year with leading zeros (001-365) **/
    replace(/H/, getDayOfYear(date), padThree);
    /** Day of the year without leading zeros (1-365) **/
    replace(/DDD/, getDayOfYear(date));
    /** Day of the month with leading zeros (01-31) **/
    replace(/DD/, date.getDate(), pad);
    /** Day of the month without leading zeros (1-31) **/
    replace(/D/, date.getDate());
    /** Abbreviated timezone name (e.g., EST, CST) **/ // 'z': () => date.getTimezoneOffset(),
    /** Offset from UTC without a colon (e.g., +0500, -0300) **/ // ZZ: () => {},
    /** Offset from UTC (e.g., +05:00, -03:00) **/ // Z: () => {},

    return format;
}
