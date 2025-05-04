import { useImperativeHandle, useRef } from "react";

export default function Popup({ targetTime, challengeTime, ref, onReset }) {
  const dialog = useRef();

  const isLost = challengeTime <= 0;

  let title = "You lost";
  let infoMsg = null;

  if (!isLost) {
    const score = Math.round((1 - challengeTime / (targetTime * 1000)) * 100);
    title = `Your score ${score}`;

    const timeLeft = challengeTime / 1000;

    infoMsg = (
      <p>
        You stopped the timer with{" "}
        <strong>{timeLeft.toFixed(2)} seconds left.</strong>
      </p>
    );
  }

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return (
    <dialog className="result-modal" ref={dialog} onClose={onReset}>
      <h2>{title}</h2>
      <p>
        The target time was:{" "}
        <strong>
          {targetTime} second{targetTime > 1 ? "s" : null}
        </strong>
      </p>
      {infoMsg}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
}
