import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Estimate from "./pages/Estimate";
import FindPro from "./pages/FindPro";
import Market from "./pages/Market";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/find-pro" element={<FindPro />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </div>
  );
}
