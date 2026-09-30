# Pulse Poll - Online Feedback Poll (ReactJS)

Create polls, vote, and watch live results. Built with React 18, Vite and React Router.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Structure
```
src/
  App.jsx                 routes + shared store
  hooks/usePolls.js       state (useState) + localStorage sync (useEffect)
  components/             Navbar, FilterBar, PollCard, PollForm
  pages/                  VotePage, ResultsPage, ManagePage
  index.css               responsive styles (grid, flexbox, dark mode)
```

## Workflow
1. **Vote** page: browse polls, search or filter by category, select an option, submit. Empty selection shows a validation error; one vote per poll.
2. **Results** page: bar charts with vote counts and percentages, leading option highlighted, totals calculated.
3. **Manage** page: add, edit and delete polls. Validation: question length, no empty or duplicate options, minimum 2 options.
Data persists in the browser via localStorage.
