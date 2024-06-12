import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();
    
    const [balance, setBalance] = useState(0);
    const [name, setName] = useState('');
    const [filter, setFilter]= useState('');
    const [user,setusers]=useState([]);


    function Transfer(id) {
        
    }

    useEffect(() => {
        if (!jwt) {
            navigate("/signin");
        } else {
            checkjwt();
        }
    }, [jwt, balance]);

    useEffect(() => {
        calllbulk();
    },[filter])

    async function calllbulk() {
        const resp=await fetch(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
        if (resp.ok) {
            const data = await resp.json();
            console.log(data);
            setusers(data.user);
        }
        else {
            console.log("couldn fetch api");
        }
     }


    async function checkjwt() {
        try {
            const resp = await fetch("http://localhost:3000/api/v1/account/balance", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            });

            if (resp.status === 200) {
                const data = await resp.json();
                setBalance(data.balance.toFixed(2));
                setName(data.firstname);
            } else {
                navigate("/signin");
            }
        } catch (error) {
            console.error("Failed to fetch balance:", error);
            navigate("/signin");
        }
    }

    {console.log(user);}

    return (
        <div>
            <h1>Welcome to our bank</h1>
            <h2>Hello {name}</h2>
            <p>Your balance is: ${balance}</p>
            <input type ="text" placeholder="Filter" onChange = {(e)=> setFilter(e.target.value)}></input>
             {user.map(users => (
                <Userbox key ={user._id} id={users._id} firstname={users.firstname} lastname={users.lastname}></Userbox>
             ))}
        </div>
    );
}


function Userbox({firstname,lastname,id}) {
    return <div style={{display:"flex"}}>
    <h3>{firstname} {lastname} </h3>
    <button style={{height:"20px" , marginLeft:"3px"}}>Send Money</button>
    </div>
}

