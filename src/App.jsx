import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Info from "./pages/Info";
import Error from "./pages/Error";

function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="*" element={<Error />} /> */}

        <Route path="/*" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="info" element={<Info />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
