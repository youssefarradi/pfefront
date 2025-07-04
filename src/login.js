// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from './logodxc.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', {
                email,
                password: motDePasse
            });

            if (response.data.success) {
                const { token, user } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                setMessage('✅ Connexion réussie !');

                // Redirection en fonction du rôle
                if (user.role.toLowerCase() === 'admin') {
                    navigate('/admin/dashboard', { state: { user } });
                } else if (user.role.toLowerCase() === 'user') {
                    navigate('/user/profile', { state: { user } });
                } else {
                    setMessage('❗ Rôle inconnu.');
                }
            } else {
                setMessage('❌ Échec de la connexion.');
            }

        } catch (error) {
            setMessage('❗ Identifiants incorrects ou erreur serveur.');
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email professionnel"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>

            {message && <p className={`login-message ${message.includes('❌') || message.includes('❗') ? 'error' : ''}`}>{message}</p>}
        </div>
    );
};

export default Login;
