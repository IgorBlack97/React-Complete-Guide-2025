import { useState } from "react";

export default function useInput({name, type, id, label, validation}) {
    const [value, setValue] = useState("");
    const [didEdit, setDidEdit] = useState(false);

    function userInputHandler(event) {
        setValue(event.target.value);
        setDidEdit(false);
    }

    function userBlurHandler() {
        setDidEdit(true);
    }

    const isInvalid = didEdit && !validation.validationFn(value);

    return {
        element: <div className="control no-margin">
          <label htmlFor={id}>{label}</label>
          <input id={id} type={type} name={name} value={value} 
            onInput={userInputHandler} 
            onBlur={userBlurHandler} 
          />
          <div className="control-error">{isInvalid && <p>{validation.errorMsg}</p>}</div>
        </div>,
        value
    }
}