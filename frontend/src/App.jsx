import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup"
import Doctor from "./pages/doctor"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
		<Route path="/doctor" element={<Doctor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;