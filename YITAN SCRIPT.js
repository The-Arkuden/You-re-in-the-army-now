<script>
    // Variables de campagne et état des batailles
    let moralJoueur = 5;
    let moralEnnemi = 5;
    let batailleEnCours = 1;
    let nombreBatailles = 3;  // La campagne comporte 3 batailles

    // Fonction pour commencer la campagne militaire
    function startCampaign() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("battleScreen").style.display = "block";
        document.getElementById("orderButtons").style.display = "flex";
        afficher(`Bataille ${batailleEnCours} commencée !`);
    }

    // Fonction pour retourner au menu
    function returnToMenu() {
        document.getElementById("battleScreen").style.display = "none";
        document.getElementById("menu").style.display = "block";
    }

    // Fonction pour afficher le résultat dans la console du jeu
    function afficher(message) {
        const output = document.getElementById("output");
        output.innerHTML += `<p>${message}</p>`;
        output.scrollTop = output.scrollHeight;  // Scroll vers le bas pour voir le dernier message
    }

    // Fonction pour donner un ordre
    function donnerOrdre(ordre) {
        afficher(`Vous donnez l'ordre de ${ordre}.`);
        let resultatJoueur = executerOrdre(ordre, "joueur");
        let ordreEnnemi = choisirOrdreEnnemi();
        let resultatEnnemi = executerOrdre(ordreEnnemi, "ennemi");

        afficher(`L'ennemi a donné l'ordre de ${ordreEnnemi}.`);

        // Résolution de la bataille pour ce tour
        resoudreBataille(resultatJoueur, resultatEnnemi);
    }

    // Fonction pour exécuter l'ordre du joueur ou de l'ennemi
    function executerOrdre(ordre, camp) {
        let moral = camp === "joueur" ? moralJoueur : moralEnnemi;
        let resultat;

        switch (ordre) {
            case "attaquer":
                resultat = moral > 5 ? "attaque réussie" : "attaque échouée";
                break;
            case "défendre":
                resultat = moral > 3 ? "défense solide" : "défense fragile";
                break;
            case "retraite":
                resultat = moral < 3 ? "retraite désorganisée" : "retraite organisée";
                break;
            case "renforcer":
                moral += 1;
                resultat = "renforcement effectué";
                break;
            case "reconnaissance":
                resultat = "reconnaissance en cours";
                break;
            default:
                resultat = "ordre inconnu";
        }

        // Mettre à jour le moral
        if (camp === "joueur") {
            moralJoueur = moral;
        } else {
            moralEnnemi = moral;
        }

        afficher(`${camp === "joueur" ? "Vos troupes" : "Les troupes ennemies"} ${resultat}.`);
        return resultat;
    }

    // Fonction pour choisir un ordre aléatoire pour l'ennemi
    function choisirOrdreEnnemi() {
        const ordres = ["attaquer", "défendre", "retraite", "renforcer", "reconnaissance"];
        return ordres[Math.floor(Math.random() * ordres.length)];
    }

    // Fonction pour résoudre la bataille
    function resoudreBataille(resultatJoueur, resultatEnnemi) {
        // Simple résolution pour savoir qui prend l'avantage
        if (resultatJoueur.includes("réussie") && !resultatEnnemi.includes("réussie")) {
            afficher("Vos troupes prennent l'avantage !");
            moralEnnemi -= 2;
        } else if (!resultatJoueur.includes("réussie") && resultatEnnemi.includes("réussie")) {
            afficher("L'ennemi prend l'avantage !");
            moralJoueur -= 2;
        } else {
            afficher("Les deux camps sont à égalité.");
        }

        // Vérifier si la bataille est terminée
        if (moralJoueur <= 0) {
            afficher("Votre armée est en déroute. Vous avez perdu !");
            terminerBataille(false);
        } else if (moralEnnemi <= 0) {
            afficher("L'ennemi est en déroute. Vous avez gagné !");
            terminerBataille(true);
        }
    }

    // Fonction pour terminer la bataille
    function terminerBataille(victoire) {
        if (victoire) {
            afficher(`Vous avez remporté la bataille ${batailleEnCours}!`);
        } else {
            afficher(`Vous avez perdu la bataille ${batailleEnCours}.`);
        }

        batailleEnCours++;

        // Si toutes les batailles de la campagne sont terminées
        if (batailleEnCours > nombreBatailles) {
            afficher("La campagne est terminée !");
            desactiverBoutons();
        } else {
            // Réinitialiser les valeurs pour la prochaine bataille
            moralJoueur = 5;
            moralEnnemi = 5;
            afficher(`Préparez-vous pour la bataille ${batailleEnCours}.`);
        }
    }

    // Fonction pour désactiver les boutons à la fin de la bataille/campagne
    function desactiverBoutons() {
        const buttons = document.querySelectorAll(".order-buttons button");
        buttons.forEach(button => button.disabled = true);
        afficher("Campagne terminée. Retournez au menu principal pour rejouer.");
        document.getElementById("orderButtons").style.display = "none";
    }
</script>
