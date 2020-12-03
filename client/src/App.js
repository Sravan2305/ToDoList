
import './App.scss';
import { Link} from 'react-router-dom';
function App() {
  return (
    <div className="App">
<h1>Welcome</h1>
<div className="nav">
                  <span><Link to="/"> Home  </Link></span>
                  
                  <span><Link to="/add"> Add</Link>  </span>
  
                  <span><Link to="/all"> All</Link>  </span>

                  <span><Link to="/priority"> Priority</Link>  </span>

                  <span><Link to="/completed"> Completed</Link>  </span>
        </div>
    </div>
  );
}

export default App;
