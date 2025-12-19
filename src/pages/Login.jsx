import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch {
            setError("Failed to log in");
        }

        setLoading(false);
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Task Manager</h1>
                <h2>Log In</h2>
                <p className="auth-subtitle">Welcome back to your workspace</p>
                {error && <div className="alert error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" ref={emailRef} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" ref={passwordRef} required />
                    </div>
                    <button disabled={loading} className="btn-primary" type="submit">
                        Log In
                    </button>
                </form>
                <div className="auth-footer">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}
