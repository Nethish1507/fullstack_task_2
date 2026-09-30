import { useState } from "react";
import FilterBar, { applyFilters } from "../components/FilterBar";

export default function ResultsPage({ polls }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const shown = applyFilters(polls, search, category);
  const totalVotes = polls.reduce((s, p) => s + p.options.reduce((a, o) => a + o.votes, 0), 0);

  return (
    <>
      <h1>Live results</h1>
      <p className="lead">{polls.length} polls, {totalVotes} votes in total.</p>
      <FilterBar {...{ search, setSearch, category, setCategory }} />
      {shown.length === 0 && <p className="empty">No results match your search.</p>}
      <div className="grid">
        {shown.map((p) => {
          const total = p.options.reduce((s, o) => s + o.votes, 0);
          const top = Math.max(...p.options.map((o) => o.votes));
          return (
            <section className="card" key={p.id}>
              <span className="tag">{p.category}</span>
              <h3>{p.question}</h3>
              {p.options.map((o) => {
                const pct = total ? Math.round((o.votes / total) * 100) : 0;
                return (
                  <div className="bar" key={o.id}>
                    <div className="bar-top"><span>{o.text}</span><span>{o.votes} ({pct}%)</span></div>
                    <div className="track"><div className={"fill" + (o.votes === top && total ? " lead-fill" : "")} style={{ width: pct + "%" }} /></div>
                  </div>
                );
              })}
              <p className="muted">{total} votes</p>
            </section>
          );
        })}
      </div>
    </>
  );
}
