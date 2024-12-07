import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [role, setRole] = useState("");  // State for storing selected role
  const [name, setName] = useState("");  // State for storing name
  const [email, setEmail] = useState("");  // State for storing email
  const [password, setPassword] = useState("");  // State for storing password
  const navigate = useNavigate(); 

  const handleSignUp = (event) => {
    event.preventDefault();
  
    // Only send data to the backend if the role is 'serviceprovider'
    const userData = {
      name,
      email,
      password,
      role,
      status: "pending", // Set status to 'pending' for all roles
    };
    
    // Send data to the backend using Axios
    axios
      .post("http://localhost:8080/api/signup", userData) // Replace with your backend URL
      .then((response) => {
        console.log("User Signed Up:", response.data);
        alert("Your request has been submitted. Please wait for approval.");
        navigate("/"); // Navigate to the dashboard after successful signup
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        alert("Error during sign up, please try again.");
      });
    
    };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-indigo-500 mb-6">Create Account</h2>

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label htmlFor="role" className="block text-lg font-medium text-gray-700">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose your role</option>
              <option value="resident">Resident</option>
              <option value="moderator">Service Provider</option>
            </select>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-md shadow-md transform hover:scale-105 transition duration-300"
            >
              Sign Up
            </button>
          </div>

          {/* Already have an account link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/signin" className="text-indigo-600 hover:text-indigo-800">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
