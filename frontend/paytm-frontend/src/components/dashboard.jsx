import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();
    
    const [balance, setBalance] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        if (!jwt) {
            navigate("/signin");
        } else {
            checkjwt();
        }
    }, [jwt, balance]);


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

    return (
        <div>
            <h1>Welcome to our bank</h1>
            <h2>Hello {name}</h2>
            <p>Your balance is: ${balance}</p>
        </div>
    );
}
