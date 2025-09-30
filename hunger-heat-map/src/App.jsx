import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import MapPage from "./pages/Map.jsx";
import Report from "./pages/Report.jsx";

function About() {
  return <div style={{ padding: 16 }}>About Us</div>;
}
function HowItWorks() {
  return <div style={{ padding: 16 }}>How it works</div>;
}
function Contact() {
  return <div style={{ padding: 16 }}>Contact</div>;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/report" element={<Report />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
