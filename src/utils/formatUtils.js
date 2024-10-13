import moment from 'moment-timezone';

const VN_TIMEZONE = 'Asia/Ho_Chi_Minh';

export const timeUtils = {
  parseUTCTimeForForm: (utcTimeString) => {
    if (!utcTimeString) return new Date();
    return new Date(utcTimeString);
  },

  formatTimeForServer: (localDate) => {
    if (!localDate) return null;
    return moment(localDate).utc().format();
  },

  formatDisplayTime: (utcTimeString) => {
    if (!utcTimeString) return '';
    return moment(utcTimeString).tz(VN_TIMEZONE).format('DD/MM/YYYY HH:mm');
  }
};
export const formatCurrency = (value) => {
  if (!value) return '0 VND';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
