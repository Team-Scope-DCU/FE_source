import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Community from "./pages/Community";
import FreeBoard from "./pages/FreeBoard";
import Adopt from "./pages/Adopt";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/freeboard" element={<FreeBoard />} />
        <Route path="/adopt" element={<Adopt />} />
      </Routes>
    </div>
  );
}
