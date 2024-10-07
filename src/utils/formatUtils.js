import moment from 'moment-timezone';

export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  return moment.utc(dateString).local().format('YYYY-MM-DDTHH:mm');
};

export const formatDateForServer = (dateString) => {
  if (!dateString) return '';
  return moment(dateString).utc().format();
};

export const formatDateTimeForDisplay = (dateString, timezone = 'Asia/Ho_Chi_Minh') => {
  if (!dateString) return '';
  return moment(dateString).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
};

export const formatCurrency = (value) => {
  if (!value) return '0 VND';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
