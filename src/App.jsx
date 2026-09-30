import { Routes, Route, Navigate } from "react-router-dom";
import usePolls from "./hooks/usePolls";
import Navbar from "./components/Navbar";
import VotePage from "./pages/VotePage";
import ManagePage from "./pages/ManagePage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  const store = usePolls();
  return (
    <>
      <Navbar />
      <main className="wrap">
        <Routes>
          <Route path="/" element={<VotePage {...store} />} />
          <Route path="/manage" element={<ManagePage {...store} />} />
          <Route path="/results" element={<ResultsPage {...store} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
