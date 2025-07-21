import { use } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function actionHandler(prevState, formData) {
    const name = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    const errors = [];

    if (!name.trim().length) {
      errors.push("Enter Your Name.");
    }

    if (!title.trim().length) {
      errors.push("Enter the Title.");
    }

    if (body.trim().length < 10) {
      errors.push("Your Opinion is too short.");
    }

    if (errors.length) {
      return {
        errors,
        enteredValues: {
          name,
          title,
          body,
        },
      };
    }

    await addOpinion({
      userName: name,
      title,
      body,
    });

    return { errors: null };
  }

  const [state, formAction, isPending] = useActionState(actionHandler, {
    errors: null,
    enteredValues: {},
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={state.enteredValues?.name}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={state.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={state.enteredValues?.body}
          ></textarea>
        </p>

        {state.errors && (
          <ul className="errors">
            {state.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <Submit />
        </p>
      </form>
    </div>
  );
}
