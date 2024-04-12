import './App.css';
import Register from './pages/register.js';
import Home from './pages/home.js';
import Archive from './pages/archive.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      
      <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blogs" element={<Archive />} />
          </Routes> 
        <body className="App-body">

        </body>
      </div>

    </Router>
  );
}

export default App;
