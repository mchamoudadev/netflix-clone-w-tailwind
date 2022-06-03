import List from '../src/pages/list';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import useAuth from './context/AuthContext';
import Browse from './pages/browse';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';



function App() {

  const { user } = useAuth();

  const RequireAuth = ({ children }) => {

    return user ? (children) : <Navigate to="/login" />;

  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            <RequireAuth><Home /></RequireAuth>
          }
        />
        <Route
          path="/browse"
          element={
            <RequireAuth><Browse /></RequireAuth>
          }
        />
        <Route
          path="/my-list"
          element={
            <RequireAuth><List /></RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
