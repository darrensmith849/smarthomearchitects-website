"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-ZA", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Africa/Johannesburg",
        }).format(new Date()),
      );
    };

    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return <span aria-label={`Local time ${time}`}>{time}</span>;
}
