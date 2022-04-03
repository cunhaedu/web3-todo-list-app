export function formatDate(rawDate?: string): string {
  if (!rawDate) {
    return '';
  }

  const date = new Date(parseInt(rawDate, 10));

  const day = String(date.getDate() + 1);
  const month = String(date.getMonth() + 1);
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hour}h ${minutes}m`;

  return `${formattedDate} - ${formattedTime}`;
}
