import { useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordForgotten: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('/api/forgotPassword', { email });
            setMessage(response.data.message);
            navigate('/connexion');
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Layout>
            <div className="bg-page">
                <div className="line-separator"></div>
                <div className="container">
                    <div className="text-center">
                        <h2 className="text-color font-bolder mb-1">Réinitialisation du mot de passe</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit} className="connexion-form">
                                <div className="mb-3">
                                    <label className="connexion-label">Email</label>
                                    <input
                                        type="email"
                                        className="connexion-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="connexion-button">Envoyer le mot de passe</button>
                                {message && <div className="alert alert-success mt-3">{message}</div>}
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PasswordForgotten;
