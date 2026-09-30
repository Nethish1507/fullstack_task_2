import { useState, useEffect } from "react";

const seed = [
  { id: 1, category: "Campus", question: "Which facility needs improvement first?",
    options: [{ id: 1, text: "Library", votes: 12 }, { id: 2, text: "Cafeteria", votes: 20 }, { id: 3, text: "Labs", votes: 9 }] },
  { id: 2, category: "Course", question: "How would you rate the React workshop?",
    options: [{ id: 1, text: "Excellent", votes: 15 }, { id: 2, text: "Good", votes: 11 }, { id: 3, text: "Needs work", votes: 2 }] },
  { id: 3, category: "Events", question: "Best time for the next hackathon?",
    options: [{ id: 1, text: "Weekend", votes: 18 }, { id: 2, text: "Weekday evening", votes: 7 }] },
];

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

// Central state: polls + which option this browser voted for on each poll
export default function usePolls() {
  const [polls, setPolls] = useState(() => load("polls", seed));
  const [voted, setVoted] = useState(() => load("voted", {}));

  useEffect(() => localStorage.setItem("polls", JSON.stringify(polls)), [polls]);
  useEffect(() => localStorage.setItem("voted", JSON.stringify(voted)), [voted]);

  const addPoll = (p) => setPolls((x) => [{ ...p, id: Date.now() }, ...x]);
  const updatePoll = (id, p) => setPolls((x) => x.map((o) => (o.id === id ? { ...o, ...p } : o)));
  const deletePoll = (id) => {
    setPolls((x) => x.filter((o) => o.id !== id));
    setVoted((v) => { const { [id]: _, ...rest } = v; return rest; });
  };
  const vote = (pollId, optionId) => {
    setPolls((x) => x.map((p) => p.id !== pollId ? p : {
      ...p, options: p.options.map((o) => o.id === optionId ? { ...o, votes: o.votes + 1 } : o),
    }));
    setVoted((v) => ({ ...v, [pollId]: optionId }));
  };

  return { polls, voted, addPoll, updatePoll, deletePoll, vote };
}
