import * as moment from 'moment';
/**
 * Convert string to Date
 *
 * @param dateInStr: string (format => 'MM/dd/yyyy')
 */
export function getDateFromString(dateInStr: string = ''): Date {
  if (dateInStr && dateInStr.length > 0) {
    const dateParts = dateInStr.trim().split('/');
    const year = toInteger(dateParts[2]);
    const month =  toInteger(dateParts[0]);
    const day = toInteger(dateParts[1]);
    // tslint:disable-next-line:prefer-const
    let result = new Date();
    result.setDate(day);
    result.setMonth(month - 1);
    result.setFullYear(year);
    return result;
  }

  return new Date();
}

/**
 * Convert Date to string with format MM/dd/yyyy
 *
 * @param date: string (format => 2021-08-22T16:37:40.948Z)
 */
export function getStringFormatDate(date: Date): string {
  if (date) {
    let result = moment(date).format('MM/DD/YYYY');
    return result;
  }

  return moment(new Date()).format('MM/DD/YYYY');
}

/**
 * Covert value to number
 *
 * @param value: any
 */
export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}
