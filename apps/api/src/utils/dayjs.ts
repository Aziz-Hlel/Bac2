import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const parseCalendarDate = (dateStr: string) => dayjs.utc(dateStr, 'YYYY-MM-DD').toDate();

export const parseTime = (timeStr: string): Date => dayjs.utc(`1970-01-01 ${timeStr}`, 'YYYY-MM-DD HH:mm').toDate();

export const toCalendarDate = (date: Date) => dayjs.utc(date).format('YYYY-MM-DD');

export const toTime = (date: Date) => dayjs.utc(date).format('HH:mm');
