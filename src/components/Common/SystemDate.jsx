import React, { useEffect, useState } from "react";

const SystemDate = () => {
  const [dateTime, setDateTime] = useState("");

  // Function to format date with timezone offset
  const getSystemDateWithOffset = () => {
    const date = new Date();

    const offset = -date.getTimezoneOffset(); // offset in minutes
    const sign = offset >= 0 ? "+" : "-";
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");

    const hours = pad(offset / 60);
    const minutes = pad(offset % 60);

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      sign +
      hours +
      ":" +
      minutes
    );
  };

  // Update every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getSystemDateWithOffset());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h2>{dateTime}</h2>;
};

export default SystemDate;
