import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [name , setname] = useState('');
    const [lastname , setlastname] = useState('');
    const [username , setusername] = useState('');
    const [password , setpassword] = useState('');
    const navigate = useNavigate();
    
    async function authorize() {
        const resp = await fetch("localhost:3000/api/v1/signup", {
            method:"POST",
            body:JSON.stringify({
                "firstname" : name,
                "lastname" : lastname,
                "username" : username,
                "password" : password
            }),
            headers:{
                "content-type" : "application/json"
            }
        })

        if (resp.status==200) {
            navigate("/dashboard");
            return;
        }
        
    }
    return <div>
    First Name<input type="text" onChange={(e)=> setname(e.target.value)}></input>
    <br></br>
    Last name<input type="text" onChange={(e)=> setlastname(e.target.value)}></input>
    <br></br>
    Username<input type="text" onChange={(e)=> setusername(e.target.value)}></input>
    <br></br>
    Password <input type="text" onChange={(e)=> setpassword(e.target.value)}></input>
    <br></br>
    <button onClick={authorize}>Sign up</button>
    <br></br>
    <p>Already have an account? </p>
    <button> Sign In</button>

    </div>
}