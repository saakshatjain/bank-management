import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const navigate = useNavigate();

  function movetosignup() {
    navigate("/signup");
    return;
  }

  async function authorize() {
    const res = await fetch("http://localhost:3000/api/v1/user/signin", {
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      }),
      headers: {
        "content-type": "application/json"
      }
    });

    if (res.status === 200) {
      const data = await res.json();
      const jwt = data.token;
      localStorage.setItem('jwt', jwt);
      navigate("/dashboard");
      return;
    }

    const data = await res.json();
    seterror(data["message"]);
  }

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
    <div className="max-w-md mx-auto p-8 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          onChange={(e) => setusername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={authorize}
        className="w-full py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Sign In
      </button>
      <div className="text-center">
        <p className="mb-4">Don't have an account?</p>
        <button
          onClick={movetosignup}
          className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
        >
          Sign Up
        </button>
      </div>
      {error && <h4 className="mt-4 text-red-500 text-center">{error}</h4>}
    </div>
    </div>
  );
}
