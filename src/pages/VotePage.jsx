import { useState } from "react";
import { Link } from "react-router-dom";
import FilterBar, { applyFilters } from "../components/FilterBar";
import PollCard from "../components/PollCard";

export default function VotePage({ polls, voted, vote }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const shown = applyFilters(polls, search, category);

  return (
    <>
      <h1>What do you think?</h1>
      <p className="lead">Pick an answer and submit. One vote per poll.</p>
      <FilterBar {...{ search, setSearch, category, setCategory }} />
      {shown.length === 0 && (
        <p className="empty">No polls match. Clear the filters or <Link to="/manage">create a poll</Link>.</p>
      )}
      <div className="grid">
        {shown.map((p) => <PollCard key={p.id} poll={p} votedOption={voted[p.id]} onVote={vote} />)}
      </div>
    </>
  );
}
