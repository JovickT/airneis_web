import Layout from "./Layout"
import logo from "../img/logo.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Contact = () =>{

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        message: ''
      });
      const [success, setSuccess] = useState(false);
      const [error, setError] = useState(false);
      const navigate = useNavigate();
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        try {
          const response = await fetch('https://localhost:8000/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          setSuccess(true);
          console.log('Success:', data);
          setFormData({
            nom: '',
            prenom: '',
            email: '',
            message: ''
          });
          setTimeout(() => {
            setSuccess(false);
           
          }, 5000);
          
          // Gérez le succès, par exemple, afficher un message de confirmation
        } catch (error) {
          console.error('Error:', error);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 5000);
          // Gérez l'erreur, par exemple, afficher un message d'erreur
        }

        navigate('/contact'); // Redirection vers la page de confirmation de contact

      };
    
      return (
        <Layout>
          <div className="d-flex flex-column align-items-center">
           
            <form onSubmit={handleSubmit} className="">
              <fieldset>
                <legend className="d-flex justify-content-center">
                  <img src={logo} alt="Logo" />
                </legend>
                <div className="contact-form-row">
                  <div className="contact-form-item">
                    <label htmlFor="nom" className="contact-label">Nom</label><br/>
                    <input
                      type="text"
                      name="nom"
                      id="nom"
                      placeholder="Jones"
                      className="contact-input"
                      value={formData.nom}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form-item">
                    <label htmlFor="prenom" className="contact-label">Prénom</label><br/>
                    <input
                      type="text"
                      name="prenom"
                      id="prenom"
                      placeholder="John"
                      className="contact-input"
                      value={formData.prenom}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <label htmlFor="email" className="contact-label" style={{width: '100%'}}>Email</label>
                  <input
                    type="email"
                    className="contact-input"
                    style={{width: '100%'}}
                    name="email"
                    id="email"
                    placeholder="exemple@xyz.fr"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="message" className="contact-label" style={{width: '100%'}}>Message</label>
                  <textarea
                    className="contact-input"
                    style={{width: '100%'}}
                    name="message"
                    id="message"
                    cols={30}
                    rows={5}
                    placeholder="Message....."
                    value={formData.message}
                    onChange={handleChange}
                  />
                  <button type="submit" className="contact-button">Envoyer</button>
                </div>
                {success && <div className="alert alert-success mt-3">Votre message a bien été envoyé </div>}
                {error && <div className="alert alert-danger mt-3">Echec d'envoie du message</div>}
              </fieldset>
            </form>
          </div>
        </Layout>
      );}

export default Contact;