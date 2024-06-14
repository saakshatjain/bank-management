import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Transfer() {
  const location = useLocation();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const [buttonstate,setbuttonstate]=useState(true);

  useEffect(() => {
    if (!jwt) {
      navigate("/signin");
    }
  }, [jwt]);

  const { firstname, lastname, id } = location.state || {};

  if (!firstname) {
    navigate("/dashboard");
    return null;
  }

  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const amount2 = parseFloat(amount);

  const handleTransfer = async () => {
    setbuttonstate(false);
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

    if (resps.status === 200) {
      setMessage("Transfer successful");
    } else {
      const data = await resps.json();
      setMessage(data.message);
    }
  };

  const back = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Transfer to {firstname} {lastname}</h3>
        <input
          type="text"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleTransfer}  disabled={!buttonstate}
          className={`w-full py-2 text-white rounded-md transition-colors mb-4 ${buttonstate==false ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Transfer
        </button>
        <h3 className="text-lg text-center text-red-500 mb-4">{message}</h3>
        <button
          onClick={back} 
          className="w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
