import dayjs from 'dayjs';

export const formatTime = (type = 'YYYY-MM-DD HH:mm') => {
  console.log('type:', type);
  return (value: string) => dayjs(value).format(type);
};

