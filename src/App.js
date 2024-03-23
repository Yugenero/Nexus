import './App.css';
import Register from './pages/register.js';
import Home from './pages/home.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home/>
        {/**<Register/> */}
      </header>
      <body className="App-body">
      </body>
    </div>

  );
}

export default App;
