import Layout from "./Layout";
import '../login.css';
import React, { useEffect, useState, ChangeEvent, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = ()=>{
    const { isAuthenticated, login } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!login) {
            setError("Erreur de configuration de l'authentification");
            return;
        }

        try {
            await login(username, password);
        } catch (err) {
            setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
        }
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const wrapper = document.querySelector('.wrapper') as HTMLDivElement;
        const registerLink = document.querySelector('.register-link') as HTMLAnchorElement | null;
        const loginLink = document.querySelector('.login-link') as HTMLAnchorElement | null;
    
        if (wrapper && registerLink) {
          registerLink.onclick = () => {
            wrapper.classList.add('active');
          };
        }
        if (wrapper && loginLink) {
          loginLink.onclick = () => {
            wrapper.classList.remove('active');
          };
        }
    
        // Nettoyage des effets lors du démontage du composant
        return () => {
          if (registerLink) {
            registerLink.onclick = null; // Supprimer l'événement onclick
          }
          if (loginLink) {
            loginLink.onclick = null; // Supprimer l'événement onclick
          }
        };
      }, []);

    return(
        <Layout>
            <div className="line-separator"></div>
            <div className="screen">
                <div className="wrapper">
                    <span className="bg-animate"></span>
                    <span className="bg-animate2"></span>
                
                    <div className="form-box login animation">
                        {/* <h2 className="animation" style={{'--i':'0','--j':'20'} as React.CSSProperties}> Connexion</h2> */}
                        <form action="#" id="login" onSubmit={handleLogin}>
                            <div className="input-box animation" style={{'--i':'1','--j':'21'} as React.CSSProperties}>
                                <input type="text" name="username" value={username} onChange={handleUsernameChange}
                                 required></input>
                                <label>Email</label>
                                <i className="bx bxs-envelope"></i>
                            </div>
                            <div className="input-box animation" style={{'--i':'2','--j':'22'} as React.CSSProperties}>
                                <input type="password" name="password" value={password} onChange={handlePasswordChange}
                                  required></input>
                                <label>Mot de passe</label>
                                <i className="bx bxs-lock-alt"></i>
                            </div>
                            <button type="submit" form="login" className="btn animation" style={{'--i':'3','--j':'23'} as React.CSSProperties}> Connexion </button>
                            <div className="logred-link animation" style={{'--i':'4','--j':'24'} as React.CSSProperties}>
                                <p>Pas de compte? <br/>
                                    <a href="#" className="register-link">Inscription</a>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="info-text login">
                        <h2 className="animation" style={{'--i':'0','--j':'20'} as React.CSSProperties}>Connexion</h2>
                    </div>

                    <div className="form-box register">
                        <form action="#">
                            <div className="input-box animation" style={{'--i':'18','--j':'1'} as React.CSSProperties}>
                                <input type="text" required></input>
                                <label>Nom complet</label>
                                <i className="bx bxs-user"></i>
                            </div>
                            <div className="input-box animation" style={{'--i':'19','--j':'2'} as React.CSSProperties}>
                                <input type="text" required></input>
                                <label>Email</label>
                                <i className="bx bxs-envelope"></i>
                            </div>
                            <div className="input-box animation" style={{'--i':'20','--j':'3'} as React.CSSProperties}>
                                <input type="password" required></input>
                                <label>Mot de passe</label>
                                <i className="bx bxs-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn animation" style={{'--i':'21','--j':'4'} as React.CSSProperties}> Inscription </button>
                            <div className="logred-link animation" style={{'--i':'22','--j':'5'} as React.CSSProperties}>
                                <p>Vous avez déjà un compte? <br/>
                                    <a href="#" className="login-link">Connexion</a>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="info-text register">
                        <h2 className="animation" style={{'--i':'17','--j':'0'} as React.CSSProperties}>Inscription</h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login;

