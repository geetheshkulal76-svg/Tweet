import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:7000/api/login", { email, password });
            setMessage(res.data.message || "User logged in successfully!");
            if (res.data.success) {
                localStorage.setItem("myToken", res.data.token);
                navigate("/tweets");
    
            } else {
                alert(res.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }
    }

    return(
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: "Segoe UI", sans-serif;
                }

                .login-container {
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                }

                .login-card {
                    background: #ffffff;
                    padding: 40px 35px;
                    border-radius: 12px;
                    width: 350px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    text-align: center;
                }

                .login-card h2 {
                    margin-bottom: 8px;
                    color: #333;
                }

                .subtitle {
                    font-size: 14px;
                    color: #777;
                    margin-bottom: 25px;
                }

                .input-group {
                    text-align: left;
                    margin-bottom: 18px;
                }

                .input-group label {
                    font-size: 14px;
                    color: #444;
                    display: block;
                    margin-bottom: 5px;
                }

                .input-group input {
                    width: 100%;
                    padding: 10px;
                    border-radius: 6px;
                    border: 1px solid #ddd;
                    outline: none;
                    transition: 0.3s;
                }

                .input-group input:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
                }

                .login-btn {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    background: #667eea;
                    color: white;
                    font-size: 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .login-btn:hover {
                    background: #5568d3;
                }

                .message {
                    margin-top: 15px;
                    font-size: 14px;
                    font-weight: 500;
                    padding: 10px;
                    border-radius: 6px;
                    background-color: #f8f9fa;
                    color: #333;
                    min-height: 20px;
                    word-wrap: break-word;
                }
            `}</style>

            <div className="login-container">
                <div className="login-card">
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Please sign in to your account</p>

                    <form onSubmit={handlelogin}>
                        <div className="input-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                placeholder="enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                placeholder="enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="login-btn">Login</button>
                    </form>

                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </>
    )
}

export default Login;