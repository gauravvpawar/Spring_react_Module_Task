import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from "./components/About";
import Home from "./components/Home"
import Dashboard from "./components/Pages/Dashboard";
import Demo from "./components/Pages/Demo";
import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>

      {/* Routes */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/demo" element={ <Demo/>} />

          <Route path="/admindashboard" element={<AdminDashboard/>}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  
    </>
  );
}

export default App;
