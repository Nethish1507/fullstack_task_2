import { useState } from "react";

// One poll on the Vote page: select an option, validate, submit
export default function PollCard({ poll, votedOption, onVote }) {
  const [choice, setChoice] = useState(null);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (choice === null) return setError("Pick an option before submitting.");
    setError("");
    onVote(poll.id, choice);
  };

  return (
    <form className="card" onSubmit={submit}>
      <span className="tag">{poll.category}</span>
      <h3>{poll.question}</h3>
      {poll.options.map((o) => (
        <label key={o.id} className={"opt" + (votedOption === o.id ? " mine" : "")}>
          <input type="radio" name={`poll-${poll.id}`} disabled={!!votedOption}
            checked={(votedOption ?? choice) === o.id} onChange={() => setChoice(o.id)} />
          {o.text}
        </label>
      ))}
      {error && <p className="err" role="alert">{error}</p>}
      {votedOption
        ? <p className="ok">Thanks, your vote is in. See the Results page.</p>
        : <button className="btn" type="submit">Submit vote</button>}
    </form>
  );
}
