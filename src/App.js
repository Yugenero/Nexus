import './App.css';
import Register from './pages/register.js';
import Home from './pages/home.js';
import Archive from './pages/archive.js';
import About from './pages/about.js';
import BlogPost from './pages/blogPost.js'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.js';

function App() {

  return (

    <Router>
      
      <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="/p/:id" element={<BlogPost />} />
          </Routes> 
      </div>

    </Router>
  );
}

export default App;
