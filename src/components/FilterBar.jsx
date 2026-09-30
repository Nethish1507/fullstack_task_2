export const CATEGORIES = ["Campus", "Course", "Events", "Other"];

// Search + category filter shared by the Vote and Results pages
export default function FilterBar({ search, setSearch, category, setCategory }) {
  return (
    <div className="filters">
      <input type="search" placeholder="Search polls" value={search}
        onChange={(e) => setSearch(e.target.value)} aria-label="Search polls" />
      <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
    </div>
  );
}

export const applyFilters = (polls, search, category) =>
  polls.filter((p) =>
    p.question.toLowerCase().includes(search.trim().toLowerCase()) &&
    (category === "All" || p.category === category));
