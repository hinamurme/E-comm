import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login or signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setMode(users.length === 0 ? "signup" : "login");

    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/"); // already logged in → go to Shop
    }
  }, [navigate]);

  const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
  const saveUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      setMessage("Email already registered. Please login.");
      setMode("login");
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify({ name, email }));
    navigate("/"); // redirect to Shop
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      setMessage("Invalid email or password.");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ name: found.name, email: found.email })
    );
    navigate("/"); // redirect to Shop
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-8">
        <h2 className="text-2xl font-semibold mb-6">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </h2>

        {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

        {mode === "signup" ? (
          <form onSubmit={handleSignup}>
            <input
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full border rounded px-3 py-2 mb-6"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-red-600 text-white py-2 rounded">
              Sign Up
            </button>

            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <button
                type="button"
                className="text-red-600 underline"
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
              >
                Login
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full border rounded px-3 py-2 mb-6"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-red-600 text-white py-2 rounded">
              Login
            </button>

            <p className="mt-4 text-sm text-center">
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-red-600 underline"
                onClick={() => {
                  setMode("signup");
                  setMessage("");
                }}
              >
                Sign Up
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
