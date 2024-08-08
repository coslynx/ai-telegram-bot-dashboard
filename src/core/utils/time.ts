import moment from 'moment';

export const formatDate = (date: Date | string, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  const formattedDate = moment(date).format(format);
  return formattedDate;
};

export const getCurrentTimestamp = () => {
  const timestamp = moment().unix();
  return timestamp;
};

export const getFormattedTimestamp = (timestamp: number, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  const formattedTimestamp = moment.unix(timestamp).format(format);
  return formattedTimestamp;
};

export const getRelativeTime = (date: Date | string) => {
  const relativeTime = moment(date).fromNow();
  return relativeTime;
};