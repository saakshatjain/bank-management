import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [error , seterror]=useState('');
    const navigate = useNavigate();
    
    function movetosignup() {
        navigate("/signup");
        return;
    }
    async function authorize() {
        
        const res = await fetch("http://localhost:3000/api/v1/user/signin", {
            method:"POST",
            body:JSON.stringify({
                "username" : username,
                "password" : password
            }),
            headers:{
                "content-type" : "application/json"
            }
        })
        
        if (res.status==200) {
            const data = await res.json();
            const jwt=data.token;
            localStorage.setItem('jwt',jwt);
            navigate("/dashboard");
            return;
        }

        const data = await res.json();
        seterror(data["message"]);

    }
    return <> 
       Username<input type="text" onChange={(e)=> setusername(e.target.value)}></input>
       <br></br>
       Password<input type="password" onChange={(e)=> setpassword(e.target.value)}></input>
       <br></br>
  
       <button onClick={authorize}>Sign in</button>
       <br></br>

       Doesnt Have a Account? 
       <button onClick={movetosignup}> Sign Up</button>
        <br></br>
       <h4>{error}</h4>
    </>
}