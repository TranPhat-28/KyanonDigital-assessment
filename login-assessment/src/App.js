import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { AuthContext } from "./contexts/AuthContext";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <div className="app-body">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={ user ? <Navigate to='/profile' /> : <Login />} />
          <Route path="/profile" element={ user ? <Profile /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
