import { useState } from "react";
import api from "../api";

const Auth = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage("");

        try {
            if (isRegistering) {
                // Register the user
                await api.post("api2/register", credentials);
                setMessage("Registration successful! Please login.");
                setIsRegistering(false);
            } else {
                // Log the user in
                const response = await api.post("api2/login", credentials);
                localStorage.setItem("token", response.data.token); // Store the token
                setMessage("Login successful!");
                onLoginSuccess(); // Notify parent component
            }
        } catch (error) {
            setError(
                isRegistering
                    ? "already register."
                    : "Login failed. Please check your credentials."
            );
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "30px 40px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    maxWidth: "400px",
                    width: "100%",
                }}
            >
                <h2 style={{ color: "#333", marginBottom: "20px", fontSize: "24px" }}>
                    {isRegistering ? "Register" : "Login"}
                </h2>
                {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>{error}</p>}
                {message && <p style={{ color: "green", fontSize: "14px", marginBottom: "10px" }}>{message}</p>}
                <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
                    <label style={{ fontWeight: "bold" }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            margin: "10px 0",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            fontSize: "16px",
                        }}
                    />
                    <label style={{ fontWeight: "bold" }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            margin: "10px 0",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            fontSize: "16px",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "#2575fc",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "16px",
                            cursor: "pointer",
                            transition: "background 0.3s",
                        }}
                        onMouseOver={(e) => (e.target.style.background = "#6a11cb")}
                        onMouseOut={(e) => (e.target.style.background = "#2575fc")}
                    >
                        {isRegistering ? "Register" : "Login"}
                    </button>
                </form>
                <p
                    style={{
                        marginTop: "15px",
                        fontSize: "14px",
                        color: "#333",
                    }}
                >
                    {isRegistering
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                    <span
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setError(null);
                            setMessage("");
                        }}
                        style={{
                            color: "#2575fc",
                            cursor: "pointer",
                            textDecoration: "underline",
                        }}
                        onMouseOver={(e) => (e.target.style.color = "#6a11cb")}
                        onMouseOut={(e) => (e.target.style.color = "#2575fc")}
                    >
                        {isRegistering ? "Login" : "Register"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;
