import { useState , useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Private from "./components/Private";
import "bootstrap/dist/css/bootstap.min.css";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
    
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      
      if (user) {
        setCurrentUser(user);  
      }
    },[]);

    const logout = () => {
      AuthService.logout();  
    };

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to ={"/home"} className="nav-link">
               Home
              </Link>
             </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/private"} className="nav-link">
                private
                </Link>  
               </li> 
            )}    
          </div>

          {currentUser ? (
              <div className="navbar-nav ms-auto">
               <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logout}>
                logout
                </a>
               </li>
              </div>  
          ) : (
            <div className="navbar-nav ms-auto">
             <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login         
              </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                    Sign up
                </Link>
            </li>
        </div>
          )}
          </nav>

          <div className="container mt-3">
           <Routes>
               <Route path="/home" element={<Home/>}/>
               <Route path="/private" element={<Private/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/signup" element={<Signup/>}/>
            </Routes>
            </div>
           </div>    
        );
    }   
    export default App;