import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SignUp() {
   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const saved = async () => {
    console.log(name, email, password, role);

    try {
      const response = await axios.post("http://localhost:9091/employees/register", {
        name,
        email,
        password,
        role
      });
      console.log("Registration Successful!");
      alert("Registration Successfull ✔️")

      // Redirect to Dashboard
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };


    //  axios.post("http://localhost:9091/employees/register",{name:a,email:b,password:c , role :d}).then
    //  ((response)=>(console.log('Registration Successfull!')))
 
    //      }
 
 
  return (
    <>
   <Navbar/>
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>

        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:shadow-outline"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:shadow-outline"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:shadow-outline"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 focus:outline-none focus:shadow-outline"
        />

        <button
          type="button"
          onClick={saved}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Register
        </button>
      </form>

    </div>
      <Footer/>
 </>
  )

}

export default SignUp;
