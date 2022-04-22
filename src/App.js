import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Browse } from './pages/Browse';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
