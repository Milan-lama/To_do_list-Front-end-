import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./Pages/Signup";
import Signin from './Pages/Signin';
import { Home } from './Pages/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;