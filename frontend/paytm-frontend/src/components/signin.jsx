import { useState } from "react";

export default function Signin() {
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    
    async function authorize() {


    }
    return <> 
       Username<input type="text" onChange={(e)=> setusername(e.target.value)}></input>
       <br></br>
       Password<input type="password" onChange={(e)=> setpassword(e.target.value)}></input>
       <br></br>

       <button onclick={authorize}>Sign in</button>
    </>
}