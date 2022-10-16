import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefualt();
        try{
            await AuthService.signup(username, password).then(
                (response) => {
                    //check for token and user already exists with 200
                 // console.log("Sign up Successfully", response);
                   navigate("/home");
                   window.location.reload();  
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
          console.log(err);  
        } 
    };
    
    return (
        <div>
        <form onSubmit={handleLogin}>
         <h3>Login</h3>
         <input
           type="text"
           placeholder="username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           />
           <input
             type="password"
             placeholder="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             />
             <button type="submit">Log in</button>
         </form>
       </div> 
);
};

export default Signup; 
    