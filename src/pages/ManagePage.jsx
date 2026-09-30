import { useState } from "react";
import PollForm from "../components/PollForm";

export default function ManagePage({ polls, addPoll, updatePoll, deletePoll }) {
  const [editing, setEditing] = useState(null);

  const save = (data) => {
    if (editing) { updatePoll(editing.id, data); setEditing(null); }
    else addPoll(data);
  };
  const remove = (p) => {
    if (window.confirm(`Delete "${p.question}"?`)) {
      deletePoll(p.id);
      if (editing?.id === p.id) setEditing(null);
    }
  };

  return (
    <>
      <h1>Manage polls</h1>
      <div className="split">
        <PollForm editing={editing} onSave={save} onCancel={() => setEditing(null)} />
        <div>
          {polls.length === 0 && <p className="empty">No polls yet. Create your first one.</p>}
          {polls.map((p) => (
            <div className="card row between" key={p.id}>
              <div><span className="tag">{p.category}</span><p>{p.question}</p></div>
              <div className="row">
                <button className="ghost" onClick={() => setEditing(p)}>Edit</button>
                <button className="ghost danger" onClick={() => remove(p)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
