import useInput from "../hooks/useInput";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";

export default function LoginTwoWayBinding() {
  const emailInput = useInput({
    name: "email",
    type: "email",
    id: "email",
    label: "Email",
    validation: {
      errorMsg: "Please enter a valid email.",
      validationFn: isEmail
    }
  });

  const passwordInput = useInput({
    name: "password",
    type: "password",
    id: "password",
    label: "Password",
    validation: {
      errorMsg: "This password is too short",
      validationFn: (value) => hasMinLength(value, 6) && isNotEmpty(value)
    }
  });

  function formSabmitHandler(event) {
    event.preventDefault();

    console.log({
      email: emailInput.value,
      password: passwordInput.value
    });
  }

  return (
    <form onSubmit={formSabmitHandler}>
      <h2>Login</h2>

      <div className="control-row">
        {emailInput.element}
        {passwordInput.element}
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
