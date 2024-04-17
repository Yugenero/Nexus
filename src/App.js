import './App.css';
import Register from './pages/register.js';
import Home from './pages/home.js';
import Archive from './pages/archive.js';
import About from './pages/about.js';
import BlogPostList from './pages/components/blogPostList.js';
import BlogPost from './pages/components/blogPost.js'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      
      <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="/" exact component={BlogPostList} />
            <Route path="/blog/:id" component={BlogPost} />
          </Routes> 
        <body className="App-body">

        </body>
      </div>

    </Router>
  );
}

export default App;
