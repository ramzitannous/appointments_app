import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm a';

export const formatDate = (momentDate) => momentDate.format(DATE_FORMAT);

export const parseDate = (dateString) => moment(dateString, DATE_FORMAT);

export const formatTime = (date) => moment(date).format(TIME_FORMAT);
