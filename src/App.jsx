import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";

import BoardHome from "@/pages/board/BoardHome";
import BoardList from "@/pages/board/BoardList";
import PostDetail from "@/pages/board/PostDetail";
import WritePost from "@/pages/board/WritePost";

import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import BusinessSignup from "@/pages/auth/BusinessSignup";
import Terms from "@/pages/auth/Terms";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Boards */}
        <Route path="/board" element={<BoardHome />} />
        <Route path="/board/:cat" element={<BoardList />} />
        <Route path="/board/:cat/write" element={<WritePost />} />
        <Route path="/board/:cat/:id" element={<PostDetail />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/business-signup" element={<BusinessSignup />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
}
