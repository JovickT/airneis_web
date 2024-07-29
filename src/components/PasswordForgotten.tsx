import { useState } from "react";
import Layout from "./Layout"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordForgotten: React.FC = () =>{

    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();  // Import from react-router-dom library to navigate to different routes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('https:/localhost:8000/api/forgotPassword', { email });
            setMessage(response.data.message);
            navigate('/connexion')  // Redirect to login page after successful password reset)
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return(
        <Layout>
            <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Forgot Password</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control w-100"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">Envoie du mot de passe</button>
                            </form>
                            {message && <div className="alert alert-success mt-3">{message}</div>}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
}

export default PasswordForgotten;