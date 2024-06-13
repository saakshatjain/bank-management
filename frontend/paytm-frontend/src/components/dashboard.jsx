import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const jwt = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('');
  const [user, setUsers] = useState([]);
  const [signed, setsigned] = useState(true);

  useEffect(() => {
    if (!jwt) {
      navigate("/signin");
    } else {
      checkjwt();
    }
  }, [jwt, balance]);

  useEffect(() => {
    callBulk();
  }, [filter]);

  function logout() {
    localStorage.removeItem('jwt');
    navigate("/signin");
    return;
  }

  async function callBulk() {
    const resp = await fetch(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
    if (resp.ok) {
      const data = await resp.json();
      console.log(data);
      setUsers(data.user);
    } else {
      console.log("Couldn't fetch API");
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

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to our bank</h1>
      <div className="flex items-center w-full max-w-3xl px-4">
        <h2 className="text-2xl font-semibold">Hello {name}</h2>
        <button
          className="ml-auto py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <p className="text-xl mt-4">Your balance is: <span className="font-bold text-xl text-blue-600">₹{balance}</span></p>

      <input
        type="text"
        placeholder="Filter"
        className="mt-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="w-full max-w-3xl mt-6">
        {user.map(user => (
          <Userbox
            key={user._id}
            id={user._id}
            firstname={user.firstname}
            lastname={user.lastname}
          />
        ))}
      </div>
    </div>
  );
}

function Userbox({ firstname, lastname, id }) {
  const navigate2 = useNavigate();

  const handleTransfer = () => {
    navigate2("/transfer", {
      state: {
        firstname: firstname,
        lastname: lastname,
        id: id,
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md mb-4">
      <h3 className="text-lg font-medium">{firstname} {lastname}</h3>
      <button
        className="py-1 px-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        onClick={handleTransfer}
      >
        Send Money
      </button>
    </div>
  );
}
