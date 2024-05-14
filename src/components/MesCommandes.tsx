import Layout from "./Layout";

interface Commande {
  id: number;
  date: string;
  montant: number;
  statut: string;
  produits: string[];
}

const MesCommandes = () => {
  // Données des commandes en dur
  const commandes: Commande[] = [
    {
      id: 1,
      date: "2023-05-15",
      montant: 50,
      statut: "En cours",
      produits: ["Produit A", "Produit B"],
    },
    {
      id: 2,
      date: "2023-07-20",
      montant: 80,
      statut: "Livrée",
      produits: ["Produit C"],
    },
    {
      id: 3,
      date: "2024-02-10",
      montant: 120,
      statut: "Annulée",
      produits: ["Produit D", "Produit E", "Produit F"],
    },
  ];

  // Fonction pour regrouper les commandes par année
  const regrouperParAnnee = (commandes: Commande[]) => {
    const commandesParAnnee: { [annee: number]: Commande[] } = {};
    commandes.forEach((commande) => {
      const annee = new Date(commande.date).getFullYear();
      if (!commandesParAnnee[annee]) {
        commandesParAnnee[annee] = [];
      }
      commandesParAnnee[annee].push(commande);
    });
    return commandesParAnnee;
  };

  const commandesParAnnee = regrouperParAnnee(commandes);
  const anneesTriees = Object.keys(commandesParAnnee).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

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
                {commandesParAnnee[parseInt(annee)].map(
                  (commande: Commande) => (
                    <li key={commande.id}>
                      <table style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: "left" }}>
                              {commande.date} - {commande.id}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {commande.statut}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "left" }}>
                              {commande.produits.length} articles
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {commande.montant}€
                            </td>
                          </tr>
                          <br></br>
                        </tbody>
                      </table>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MesCommandes;
