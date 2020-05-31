import moment from 'moment';

export const utcFormat = (time, format) => moment(time).format(format);
