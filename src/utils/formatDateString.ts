import {format, parseISO} from "date-fns";

/**
 * Formats datestrings.
 * @param {string} dateString - datestring value, could be undefined
 * @param {string} options - options for formattter, defaults to: 'dd.MM.yyyy'
 * @example  formatDateString(data.dt_txt, "h:mm a")
 */

function formatDateString(dateString: string | undefined, options: string = 'dd.MM.yyyy') {
    if (!dateString) {
        return ""
    }
    return format(parseISO(dateString), options)
}

export default formatDateString;