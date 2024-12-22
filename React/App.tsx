import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
/*
Display array elements w/ map()
const arr = ['apple', 'banana', 'orange'];
const dispArr = arr.map((item) => <p>{item}</p>)
*/
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;