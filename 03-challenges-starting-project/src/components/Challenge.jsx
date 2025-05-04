import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Popup from "./Popup";

export default function Challenge({ title, targetTime }) {
  const challengeIntervalRef = useRef();
  const popupRef = useRef();

  const [challengeTime, setChallengeTime] = useState(targetTime * 1000);

  const isTimerActive = challengeTime > 0 && challengeTime < targetTime * 1000;

  // If time is over
  if (challengeTime <= 0) {
    clearInterval(challengeIntervalRef.current);
    popupRef.current.open();
  }

  function resetTimer() {
    setChallengeTime(targetTime * 1000);
  }

  function onStartClickHandler() {
    challengeIntervalRef.current = setInterval(() => {
      setChallengeTime((prevState) => prevState - 10);
    }, 10);
  }

  function onStopClickHandler() {
    clearInterval(challengeIntervalRef.current);
    popupRef.current.open();
  }

  return (
    <>
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">Target time: {targetTime}</p>
        <button
          onClick={isTimerActive ? onStopClickHandler : onStartClickHandler}
        >
          {isTimerActive ? "Stop" : "Start"} Challenge
        </button>
        <p>{isTimerActive ? "Time is ranning" : "Timer inactive"} </p>
      </section>
      {createPortal(
        <Popup
          targetTime={targetTime}
          challengeTime={challengeTime}
          onReset={resetTimer}
          ref={popupRef}
        />,
        document.getElementById("modal")
      )}
    </>
  );
}
