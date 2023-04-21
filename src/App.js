import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import {Home} from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./style.scss"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser}=useContext(AuthContext);
  return (
    <Router>
      <Routes>
      <Route path="/">
        <Route index element={currentUser?<Home/>:<Login/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
