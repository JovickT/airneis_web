import { useState } from "react";
import Layout from "./Layout"

const CGU = () =>{

    return(
        <Layout>
            <div className="bg-page">
                <div className="line-separator"></div>
                <div className="container">
                    <h1 className="text-center text-color">CONDITIONS GÉNÉRALES D'UTILISATION</h1>
                    <p className="text-center mb-5">En vigueur au 10/07/2024</p>
                    <div className="cgu">
                        <p>
                        Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique
                        des modalités de mise à disposition du site et des services par Airneis et de définir les conditions
                        d’accès et d’utilisation des services par « l'Utilisateur ».
                        </p>
                        <p>Les présentes CGU sont accessibles sur le site à la rubrique «CGU».</p>
                        <p>
                        Toute inscription ou utilisation du site implique l'acceptation sans aucune réserve ni restriction des
                        présentes CGU par l’utilisateur. Lors de l'inscription sur le site via le Formulaire d’inscription, chaque
                        utilisateur accepte expressément les présentes CGU en cochant la case précédant le texte suivant : «
                        Je reconnais avoir lu et compris les CGU et je les accepte ».
                        En cas de non-acceptation des CGU stipulées dans le présent contrat, l'Utilisateur se doit de
                        renoncer à l'accès des services proposés par le site.
                        airneis.com se réserve le droit de modifier unilatéralement et à tout moment le contenu des
                        présentes CGU.
                        </p>

                        <h4 className="mt-5 text-color">ARTICLE 1 : LES MENTIONS LÉGALES</h4>

                        <p>
                        L'édition du site airneis.com est assurée par la Société SARL Airneis au capital de 10000 euros,
                        immatriculée au RCS de Beverworth sous le numéro 36252187900034 , dont le siège social est situé
                        au 36232 Korbin Crossing 0334 Beverworth<br/>
                        Numéro de téléphone 140874582169<br/>
                        Adresse e-mail : contact@airneis.com.<br/>
                        Le Directeur de la publication est : H3 Hitema<br/>
                        </p>
                        <p>
                        L'hébergeur du site airneis.com est la société OVH, dont le siège social est situé au 2 rue
                        Kellermann, 59100 Roubaix , avec le numéro de téléphone : 0952041876.
                        </p>

                        <h4 className="mt-5 text-color">ARTICLE 2 : ACCÈS AU SITE</h4>

                        <p>
                        Le site airneis.com permet à l'Utilisateur un accès gratuit aux services suivants :<br/>
                        Le site internet propose les services suivants :<br/>
                        ventes de meubles<br/>
                        Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les
                        frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion
                        Internet, etc.) sont à sa charge.
                        </p>
                        <p>
                        L’Utilisateur non membre n'a pas accès aux services réservés. Pour cela, il doit s’inscrire en
                        remplissant le formulaire. En acceptant de s’inscrire aux services réservés, l’Utilisateur membre
                        s’engage à fournir des informations sincères et exactes concernant son état civil et ses coordonnées,
                        notamment son adresse email.<br/>
                        Pour accéder aux services, l’Utilisateur doit ensuite s'identifier à l'aide de son identifiant et de son mot
                        de passe qui lui seront communiqués après son inscription.<br/>
                        Tout Utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription en se
                        rendant à la page dédiée sur son espace personnel. Celle-ci sera effective dans un délai raisonnable.<br/>
                        Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du site
                        ou serveur et sous réserve de toute interruption ou modification en cas de maintenance, n'engage
                        pas la responsabilité de airneis.com. Dans ces cas, l’Utilisateur accepte ainsi ne pas tenir rigueur à
                        l’éditeur de toute interruption ou suspension de service, même sans préavis.<br/>
                        L'Utilisateur a la possibilité de contacter le site par messagerie électronique à l’adresse email de
                        l’éditeur communiqué à l’ARTICLE 1.<br/>
                        </p>
                        <h4 className="mt-5 text-color">ARTICLE 3 : COLLECTE DES DONNÉES</h4>
                        <p>
                        Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect
                        de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers
                        et aux libertés.
                        </p>
                        <p>
                        En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit
                        d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur
                        exerce ce droit :<br/>
                        - via un formulaire de contact ;
                        </p>
                        <h4 className="mt-5 text-color">ARTICLE 4 : PROPRIÉTÉ INTELLECTUELLE</h4>
                        <p>
                        Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet
                        d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
                        </p>
                        <p>
                        L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie
                        des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement
                        privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.
                        </p>
                        <p>
                        Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l’autorisation
                        expresse de l’exploitant du site Internet constituerait une contrefaçon sanctionnée par l’article L 335-2
                        et suivants du Code de la propriété intellectuelle.
                        </p>
                        <p>
                        Il est rappelé conformément à l’article L122-5 du Code de propriété intellectuelle que l’Utilisateur qui
                        reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa source.
                        </p>
                        <h4 className="mt-5 text-color">ARTICLE 5 : RESPONSABILITÉ</h4>
                        <p>
                        Les sources des informations diffusées sur le site airneis.com sont réputées fiables mais le site ne
                        garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.
                        </p>
                        <p>
                        Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle.
                        Malgré des mises à jour régulières, le site airneis.com ne peut être tenu responsable de la
                        modification des dispositions administratives et juridiques survenant après la publication. De même, le
                        site ne peut être tenue responsable de l’utilisation et de l’interprétation de l’information contenue dans
                        ce site.<br/>
                        L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de passe, quelle
                        que soit sa forme, est interdite. Il assume les risques liés à l'utilisation de son identifiant et mot de
                        passe. Le site décline toute responsabilité.
                        Le site airneis.com ne peut être tenu pour responsable d’éventuels virus qui pourraient infecter
                        l’ordinateur ou tout matériel informatique de l’Internaute, suite à une utilisation, à l’accès, ou au
                        téléchargement provenant de ce site.
                        </p>
                        <p>
                        La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et
                        insurmontable d'un tiers.
                        </p>
                        <h4 className="mt-5 text-color">ARTICLE 6 : LIENS HYPERTEXTES</h4>
                        <p>
                        Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en cliquant sur ces
                        liens, il sortira du site airneis.com. Ce dernier n’a pas de contrôle sur les pages web sur lesquelles
                        aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
                        </p>
                        <h4 className="mt-5 text-color">ARTICLE 7 :COOKIES</h4>
                        <p>
                        L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement
                        sur son logiciel de navigation.
                        </p>
                        <p>
                        Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l’ordinateur de
                        l’Utilisateur par votre navigateur et qui sont nécessaires à l’utilisation du site airneis.com. Les cookies
                        ne contiennent pas d’information personnelle et ne peuvent pas être utilisés pour identifier quelqu’un.<br/>
                        Un cookie contient un identifiant unique, généré aléatoirement et donc anonyme. Certains cookies
                        expirent à la fin de la visite de l’Utilisateur, d’autres restent.
                        </p>
                        <p>L’information contenue dans les cookies est utilisée pour améliorer le site airneis.com</p>
                        <p>
                        En naviguant sur le site, L’Utilisateur les accepte.<br/>
                        L’Utilisateur doit toutefois donner son consentement quant à l’utilisation de certains cookies.<br/>
                        A défaut d’acceptation, l’Utilisateur est informé que certaines fonctionnalités ou pages risquent de lui
                        être refusées.<br/>
                        L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son
                        logiciel de navigation.
                        </p>
                        <h4 className="mt-5 text-color">ARTICLE 8 : DROIT APPLICABLE ET JURIDICTION COMPÉTENTE</h4>
                        <p>
                        La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un
                        litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.<br/>
                        Pour toute question relative à l’application des présentes CGU, vous pouvez joindre l’éditeur aux
                        coordonnées inscrites à l’ARTICLE 1.
                        </p>
                        <p>Rédigé sur <a href="http://legalplace.fr"className="color-link">http://legalplace.fr</a></p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CGU;