const toDate = (date) => new Date(date);

export const formatYear = (date) => {
  return toDate(date).toLocaleDateString("en-US", {
    year: "numeric",
  });
};

export const formatMonth = (date) => {
  return toDate(date).toLocaleDateString("en-US", {
    month: "short",
  });
};

export const formatDay = (date) => {
  return toDate(date).toLocaleDateString("en-US", {
    day: "2-digit",
  });
};

export const formatWeekDay = (date) => {
  return toDate(date).toLocaleDateString("en-US", {
    weekday: "short",
  });
};

export const formatYearShort = (date) => {
  return toDate(date).toLocaleDateString("en-US", {
    year: "2-digit",
  });
};

export const formatTime = (time) => {
  return toDate(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatFullDate = (date) => {
  return toDate(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
};

export const runtimeFormater = (runtime) => {
  const min = runtime % 60;
  const hour = (runtime - min) / 60;

  return `${hour}h ${min}m`;
};
