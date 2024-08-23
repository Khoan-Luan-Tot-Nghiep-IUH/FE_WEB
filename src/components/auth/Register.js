import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
            setMessage('Registration successful!');
        } catch (error) {
            setMessage(`Error: ${error.response?.data || error.message}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleRegister}>Register</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Register;
