import './App.css';
import Register from './pages/register.js';
import Home from './pages/home.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/components/header.js';

function App() {

  return (
    <Router>
      <div className="App">
        <Header/>
        <header className="App-content">
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
