function pad(val: number, len = 2) {
    let padded = `${val}`;
    let appendLen = len - padded.length;
    if (appendLen <= 0) padded;
    return '0'.repeat(appendLen) + val;
}

export function splitDate(d = new Date()) {
    const fullYear = d.getFullYear();
    const monthIndex = d.getMonth();
    const date = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const milliseconds = d.getMilliseconds();

    /**
     * @returns `AM` or `PM` based on value of `hours`.
     */
    function amPm() {
        return hours < 12 ? 'AM' : 'PM';
    }

    function getPaddedDateSegments() {
        return {
            year: fullYear,
            month: pad(monthIndex + 1),
            date: pad(date)
        };
    }

    function getPaddedTimeSegments() {
        return {
            hours: pad(hours),
            minutes: pad(minutes),
            seconds: pad(seconds),
            milliseconds: pad(milliseconds, 3)
        };
    }

    /**
     * Gets time segments in 12-hour-time. For milliseconds,
     * returns the value formatted into three digits. For the others,
     * returns the values formatted into two digits.
     *
     * @example
     * // If current time is `9:00`, returns `09`
     * getCivilianTime().hours
     * // If current ms are `25`, returns `025`
     * getCivilianTime().milliseconds
     */
    function getCivilianTime() {
        const hh = pad(hours % 12);
        const mm = pad(minutes);
        const ss = pad(seconds);
        const mss = milliseconds;

        const a = hours < 12 ? 'am' : 'pm';

        return {
            hours: hh,
            minutes: mm,
            seconds: ss,
            milliseconds: mss,
            a,
            A: a.toUpperCase()
        };
    }

    return {
        now: d,
        fullYear,
        monthIndex,
        date,
        hours,
        minutes,
        seconds,
        milliseconds,
        getCivilianTime,
        getPaddedDateSegments,
        getPaddedTimeSegments,
        amPm
    };
}
