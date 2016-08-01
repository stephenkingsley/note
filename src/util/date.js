export const formatDate = (date) => {
  const beforeFormatDate = new Date(date);
  const year = beforeFormatDate.getFullYear();
  const month = beforeFormatDate.getMonth();
  const day = beforeFormatDate.getDate();
  const hours = beforeFormatDate.getHours();
  const mins = beforeFormatDate.getMinutes();
  const sencond = beforeFormatDate.getSeconds();
  return `${year}/${month}/${day} ${hours}:${mins}:${sencond}`;
};
