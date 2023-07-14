import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Info from "./pages/Info";

function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/*" element={PrivateRoute}>
          <Route to="dashboard" element={<Dashboard />} />
          <Route to="info" element={<Info />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
