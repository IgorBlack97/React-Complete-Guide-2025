import { useEffect, useState } from "react";

export default function ProgressBar({ timeout, onTimeout, isAnswered }) {
  const [value, setValue] = useState(timeout);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setValue((prev) => prev - 5);
    }, 5);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onTimeout, timeout]);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={value}
      className={isAnswered ? "answered" : null}
    />
  );
}
