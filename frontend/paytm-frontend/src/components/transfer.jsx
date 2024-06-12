import React from 'react';
import { useEffect , useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Transfer() {
    const location = useLocation();
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        if (!jwt) {
            navigate("/signin");
        } 
    }, [jwt]);

    const {firstname , lastname , id} = location.state || {}

    if (!firstname) {
        navigate("/dashboard");
        return;
    }

    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const amount2=parseFloat(amount);

    const handleTransfer = async () => {
        const resps = await fetch("http://localhost:3000/api/v1/account/transfer", {
            method: "POST",
            body: JSON.stringify({
                "amount": amount2,
                "to": id
            }),
            headers: {
                "content-type": "application/json",
                 "Authorization": `Bearer ${jwt}`,
            }
        });
         
        if (resps.status==200) {
            setMessage("successful");
        }
        else {
            const data = await resps.json();
            setMessage(data.message);
        }
       
    };

    const back = () => {
        navigate("/dashboard");
    };

    return (
        <div>
            <h3>Transfer to {firstname} {lastname}</h3>
            <input type="text" onChange={(e) => setAmount(e.target.value)} placeholder="Enter Amount"></input>
            <button onClick={handleTransfer}>Transfer</button>
            <h3>{message}</h3>
            <button onClick={back}>Go Back</button>
        </div>
    );
}
