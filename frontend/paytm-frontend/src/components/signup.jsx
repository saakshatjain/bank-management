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
            const res=await resp.json();
            const jwt=res.token;
            localStorage.setItem('jwt',jwt);
            navigate("/dashboard");
            return;
        }

        const data = await resp.json();
        seterror(data["message"]);


    }
    return <div className="bg-blue-200">
       <div className="max-w-md mx-auto p-8 bg-gray-100 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <label className="block text-gray-700">First Name</label>
    <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=> setname(e.target.value)}></input>
    <br></br>
    <label className="block text-gray-700">Last Name</label>
  <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=> setlastname(e.target.value)}></input>
    <br></br>
    <label className="block text-gray-700">Username</label>
 <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=> setusername(e.target.value)}></input>
    <br></br>
    <label className="block text-gray-700">Password</label>
     <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=> setpassword(e.target.value)}></input>
    <br></br>
    <br></br>
    <button onClick={authorize} className="w-full py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Sign up</button>
    <br></br>
    <p className="mb-4 text-center">Already have an account?</p>
    <div className="text-center">
    <button onClick={movetosignin} className="text-center py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">Sign In</button>
     <br></br>
     </div>
    <h4 className="mt-4 text-red-500 text-center">{error}</h4>
    </div>
    </div>
}