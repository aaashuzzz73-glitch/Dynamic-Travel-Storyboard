// Format date for display
export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Convert date into YYYY-MM-DD format
export const formatDateInput = (date) => {
  if (!date) return "";

  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Check whether two dates are the same
export const isSameDay = (date1, date2) => {
  return formatDateInput(date1) === formatDateInput(date2);
};

// Calculate total trip days
export const calculateTripDays = (startDate, endDate) => {
  const start = new Date(`${formatDateInput(startDate)}T00:00:00`);
  const end = new Date(`${formatDateInput(endDate)}T00:00:00`);

  return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
};