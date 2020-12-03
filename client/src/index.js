import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Link, BrowserRouter } from 'react-router-dom';
import GiveRoutes from './Routes';
//import App from './App';
import swdev from './serviceworkerDev';

function Home(){
  return(
    <div>
      <div className="nav">
                <span><Link className="link" to="/"> Home  </Link></span>
                
                <span><Link className="link" to="/add"> Add</Link>  </span>

                <span><Link className="link"  to="/all"> All</Link>  </span>

                <span><Link className="link" to="/priority"> Priority</Link>  </span>

                <span><Link className="link" to="/completed"> Completed</Link>  </span>
      </div>
      <GiveRoutes/>
    </div>
  );
}


ReactDOM.render(
  <BrowserRouter>
      <Home/>
    
  </BrowserRouter>,
  document.getElementById('root')
);


swdev();