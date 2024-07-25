import React, { useEffect, useState } from 'react';
import Layout from './Layout'; // Assurez-vous d'importer correctement votre Layout
import { useNavigate } from 'react-router-dom';

interface Commande {
  reference: string,
  date_commande: string,
  ttc: number,
  tva: number,
  etat: string,
  panier: {
    nom: string,
    prix: number,
    quantite: number,
    image: string,
    description: string,
    categorie: string, 
  }[],
  adresse: {
    nom: string,
    prenom: string,
    rue: string,
    cp: string,
    ville: string,
    pays: string,
    telephone: string
  },

}

const MesCommandes = () => {
  const [mesCommandes, setMesCommandes] = useState<Commande[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://localhost:8000/mesCommandes')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMesCommandes(data.success);
        } else {
          console.error('Données incorrectes :', data);
        }
      })
      .catch(error => console.error('Erreur lors de la récupération des données depuis le backend :', error));
  }, []);

  // Fonction pour regrouper les commandes par année
  const regrouperParAnnee = (commandes: Commande[]) => {
    const commandesParAnnee: { [annee: number]: Commande[] } = {};
    commandes.forEach((commande) => {
      const annee = new Date(commande.date_commande).getFullYear();
      if (!commandesParAnnee[annee]) {
        commandesParAnnee[annee] = [];
      }
      commandesParAnnee[annee].push(commande);
    });
    return commandesParAnnee;
  };

  const commandesParAnnee = regrouperParAnnee(mesCommandes);
  const anneesTriees = Object.keys(commandesParAnnee).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  const handleDisplayDetail = (commande: Commande) => {
    navigate('/commande', { state: { commande } });
  };

  return (
    <Layout>
      <div className="bg-page">
        <div className="line-separator"></div>
        <div className="container">
          <div className="text-center">
            <h1 className="text-color font-bolder mb-5">Mes commandes</h1>
          </div>
          {anneesTriees.map((annee) => (
            <div key={annee} style={{ margin: '0% 20%' }}>
              <h2>{annee}</h2>
              <hr />
              <ul>
                {commandesParAnnee[parseInt(annee)].map((commande,index) => (
                  <li key={commande.reference} onClick={() => handleDisplayDetail(commande)}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            {commande.date_commande} - {commande.reference}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {commande.etat}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "left" }}>
                            {commande.panier.length} articles
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {commande.ttc}€
                          </td>
                        </tr>
                        <br></br>
                      </tbody>
                    </table>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MesCommandes;
