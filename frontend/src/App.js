import './App.css';
import Navbar from './Navbar';
import ManagerDashboard from './Manager/ManagerDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from "./Manager/AddItem";

function App() {
  return (

    <Router>
      <div className="App">
       <Navbar />
      <h1>Welcome!!!!</h1>
      </div>
      <Routes>
        <Route path="/Manager/ManagerDashboard" element={<ManagerDashboard />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </Router>

    

    
  );
}

export default App;
