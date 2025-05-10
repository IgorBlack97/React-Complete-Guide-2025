import { useEffect } from "react";
import ProgressBar from "./ProgressBar";
const TIME_TO_CONFIRM = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timetId = setTimeout(() => {
      onConfirm();
    }, TIME_TO_CONFIRM);

    return () => {
      console.log("clear run");
      clearTimeout(timetId);
    };
  }, []);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar max={TIME_TO_CONFIRM} />
    </div>
  );
}
