/**
 * Format a date into Indonesian date format (DD/MM/YYYY or other styles)
 *
 * @param {string|Date} dateInput - The date input (string or Date object)
 * @param {boolean} includeTime - Whether to include time in the format
 * @returns {string} Formatted date in Indonesian format
 */
export function formatDateIndonesia(dateInput, includeTime = false) {
  // Ensure the input is a valid Date object
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  // Array of month names in Indonesian
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  // Extract day, month, and year
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format time if includeTime is true
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  // Return the formatted date string
  return includeTime ? `${day} ${month} ${year}, ${time}` : `${day} ${month} ${year}`;
}
