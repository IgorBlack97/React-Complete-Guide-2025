import { use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { useActionState } from "react";
import { useOptimistic } from "react";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  const [optimisticVotesState, updateOptimisticVotesState] = useOptimistic(
    votes,
    (prevVal, action) => (action === "up" ? prevVal + 1 : prevVal - 1)
  );

  async function voteupAction() {
    updateOptimisticVotesState("up");
    await upvoteOpinion(id);
  }

  async function votedownAction() {
    updateOptimisticVotesState("down");
    await downvoteOpinion(id);
  }

  const [voteUpState, voteUpFormAction, voteUpIsPending] =
    useActionState(voteupAction);
  const [voteDownState, voteDownFormAction, voteDownIsPending] =
    useActionState(votedownAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={voteUpFormAction}
          disabled={voteUpIsPending || voteDownIsPending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotesState}</span>

        <button
          formAction={voteDownFormAction}
          disabled={voteUpIsPending || voteDownIsPending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
