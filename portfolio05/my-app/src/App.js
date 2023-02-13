import './App.css';
import Login from "./pages/common/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/main" element={<Main />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
