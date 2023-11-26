import react from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
