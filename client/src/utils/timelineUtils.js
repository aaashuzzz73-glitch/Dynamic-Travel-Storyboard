import { isSameDay } from "./dateUtils";

// Organize trip data day-wise
export const generateTimeline = (
  startDate,
  endDate,
  bookings = [],
  activities = [],
  notes = [],
  media = []
) => {
  const timeline = [];

  const start = new Date(`${startDate.slice(0, 10)}T00:00:00`);
  const end = new Date(`${endDate.slice(0, 10)}T00:00:00`);

  for (
    let currentDate = new Date(start);
    currentDate <= end;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const date = new Date(currentDate);

    timeline.push({
      date,
      bookings: bookings.filter(
        (item) => item.bookingDate && isSameDay(item.bookingDate, date)
      ),
      activities: activities.filter(
        (item) => isSameDay(item.date, date)
      ),
      notes: notes.filter(
        (item) => isSameDay(item.date, date)
      ),
      media: media.filter(
        (item) => isSameDay(item.date, date)
      ),
    });
  }

  return timeline;
};