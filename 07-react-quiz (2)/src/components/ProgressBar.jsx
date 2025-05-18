import { useEffect, useState } from "react";

export default function ProgressBar({ timeOut, onTimeout, mode }) {
  const [value, setValue] = useState(timeOut);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((value) => value - 10);
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onTimeout();
    }, timeOut);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <progress max={timeOut} value={value} className={mode} />;
}
