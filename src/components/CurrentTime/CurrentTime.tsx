import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: any) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Text component="p" c="dimmed" fw={600} style={{ userSelect: "none" }}>
      {formatTime(currentTime)}
    </Text>
  );
};

export default CurrentTime;
