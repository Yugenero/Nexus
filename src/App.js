import './App.css';
import Register from './pages/register.js';
import Home from './pages/home.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </header>
        <body className="App-body">
        </body>
      </div>
    </Router>
  );
}

export default App;
