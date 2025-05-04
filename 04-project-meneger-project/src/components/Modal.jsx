import { useImperativeHandle, useRef } from "react";
import Button from "./Button";
import { createPortal } from "react-dom";

export default function Modal({ children, buttonCaption, ref }) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => ({
    openDialog,
  }));

  function openDialog() {
    dialogRef.current.showModal();
  }

  return createPortal(
    <>
      <dialog
        ref={dialogRef}
        className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
      >
        {children}
        <form method="dialog" className="mt-4 text-right">
          <Button>{buttonCaption}</Button>
        </form>
      </dialog>
    </>,
    document.getElementById("modal-root")
  );
}
