import Layout from "./Layout";
import  canape  from "../img/canape.jpg";

// Définition du type pour une checkout
interface Checkout {
  id: number;
  date: string;
  montant: number;
  statut: string;
  produits: { id: number; nom: string; description: string; prix: number; quantite: number }[];
  adresseLivraison: string;
  adresseFacturation: string;
  methodePaiement: string;
}

const CheckoutDetails = () => {
  // Données de checkout en dur
  const checkout: Checkout = {
    id: 34834939,
    date: "2022-04-12",
    montant: 4800,
    statut: "En cours",
    produits: [
      { id: 1, nom: "Table", description: "bfiuzbe ubezfkn iuzbef ujb iubefj", prix: 1200, quantite: 1 },
      { id: 2, nom: "Chaise", description: "Description de la chaise", prix: 300, quantite: 2 },
      // Ajoutez ici d'autres produits si nécessaire
    ],
    adresseLivraison: "John SMITH\n53 Rue de la Lune\n75006 PARIS\nFRANCE",
    adresseFacturation: "John SMITH\n53 Rue de la Lune\n75006 PARIS\nFRANCE",
    methodePaiement: "**** **** **** 4923"
  };

  return (
    <Layout>
      <div className="bg-page">
        <div className="line-separator"></div>
        <div className="container">
          <div className="text-center">
            <h1 className="text-color font-bolder mb-5">Checkout #{checkout.id} - {checkout.date} - {checkout.statut}</h1>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h2>Produits</h2>
              {checkout.produits.map(produit => (
                <div key={produit.id} className="d-flex" style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <img src={canape} alt="" className="mb-2 rounded-5" height="35%" width="35%"/>
                  <div className="ml-3">
                    <div><strong>{produit.nom}</strong></div>
                    <div>{produit.description}</div>
                  </div>
                  <div>
                    <div>{produit.prix}€</div>
                    <div><input type="number" id="tentacles" value={produit.quantite} style={{ width: "50px" }} /></div>
                    <button>Retirer</button>
                  </div>
                </div>
              
              ))}
            </div>
            <div className="col-md-6">
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left" }}> 
                      <h2>Total</h2>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {checkout.montant}€
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      TVA
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {checkout.montant * 0.2}€
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <h3>Adresse de livraison</h3>
              <p>{checkout.adresseLivraison}</p>
              <hr />
              <h3>Adresse de facturation</h3>
              <p>{checkout.adresseFacturation}</p>
              <hr />
              <h3>Méthode de paiement</h3>
              <p>{checkout.methodePaiement}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutDetails;