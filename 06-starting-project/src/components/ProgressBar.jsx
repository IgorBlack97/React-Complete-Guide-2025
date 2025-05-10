import { useEffect, useState } from "react";

export default function ProgressBar({ max }) {
  const [progress, setProgress] = useState(max);

  useEffect(() => {
    const timetId = setInterval(() => {
      setProgress((prev) => prev - 10);
    }, 10);

    return () => {
      console.log("clear run");
      clearInterval(timetId);
    };
  }, []);

  return <progress value={progress} max={max} />;
}
