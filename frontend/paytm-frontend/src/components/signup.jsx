import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Signup() {
    const [name , setname] = useState('');
    const [lastname , setlastname] = useState('');
    const [username , setusername] = useState('');
    const [password , setpassword] = useState('');
    const [error,seterror]=useState('');
    const navigate = useNavigate();

    function movetosignin() {
        navigate("/signin");
        return;
    }
    
    async function authorize() {
        const resp = await fetch("http://localhost:3000/api/v1/user/signup", {
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
            const jwt=res.token;
            localStorage.setItem('jwt',jwt);
            navigate("/dashboard");
            return;
        }

        const data = await resp.json();
        seterror(data["message"]);


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
    Already have an account?
    <button onClick={movetosignin}>Sign In</button>
     <br></br>
    <h4>{error}</h4>

    </div>
}