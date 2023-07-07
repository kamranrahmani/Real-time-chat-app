import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import AuthContextProvider from "./context/authContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
