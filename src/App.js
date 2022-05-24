import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Browse } from './pages/Browse';
import Home from './pages/Home';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
