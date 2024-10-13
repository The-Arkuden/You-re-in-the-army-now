/ Variables de campagne
let moral = 5;
let nombreHommes = 100;
let officiers = [];

// Fonction pour commencer la campagne militaire
function startCampaign() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("campaignMenu").style.display = "block";
    genererOfficiers(3);  // Génère 3 officiers au début
    mettreAJourResume();
}

// Fonction pour mettre à jour le résumé
function mettreAJourResume() {
    document.getElementById("moral").innerText = `Moral : ${moral}`;
    document.getElementById("nombreHommes").innerText = `Nombre d'hommes : ${nombreHommes}`;
    afficherOfficiers();
}

// Fonction pour afficher les officiers
function afficherOfficiers() {
    const officiersDiv = document.getElementById("officiers");
    officiersDiv.innerHTML = '';
    officiers.forEach(officier => {
        officiersDiv.innerHTML += `<div>
            <h4>${officier.nom}</h4>
            <img src="${officier.image}" alt="${officier.nom}">
            <p>Nez: ${officier.nez}</p>
            <p>Bouche: ${officier.bouche}</p>
            <p>Coiffure: ${officier.coiffure}</p>
            <p>Yeux: ${officier.yeux}</p>
            <p>Oreilles: ${officier.oreilles}</p>
        </div>`;
    });
}

// Fonction pour générer des officiers avec des caractéristiques aléatoires
function genererOfficiers(nombre) {
    const caracteristiques = {
        nez: ['Droit', 'Crochu', 'Plat'],
        bouche: ['Fine', 'Large', 'Serrée'],
        coiffure: ['Courte', 'Longue', 'Bald'],
        yeux: ['Bleus', 'Verts', 'Marron'],
        oreilles: ['Pointues', 'Rondes', 'Aplatées'],
    };

    for (let i = 0; i < nombre; i++) {
        officiers.push({
            nom: `Officier ${i + 1}`,
            nez: caracteristiques.nez[Math.floor(Math.random() * 3)],
            bouche: caracteristiques.bouche[Math.floor(Math.random() * 3)],
            coiffure: caracteristiques.coiffure[Math.floor(Math.random() * 3)],
            yeux: caracteristiques.yeux[Math.floor(Math.random() * 3)],
            oreilles: caracteristiques.oreilles[Math.floor(Math.random() * 3)],
            image: 'https://via.placeholder.com/100'  // Image par défaut (à remplacer par des images réelles)
        });
    }
}

// Fonction pour commencer une bataille
function startBattle() {
    afficher(`Bataille commencée! Préparez vos officiers.`);
}

// Fonction pour retourner au menu principal
function returnToMenu() {
    document.getElementById("campaignMenu").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

// Fonction pour afficher des messages dans la console de jeu
function afficher(message) {
    const output = document.getElementById("output");
    output.innerHTML += `<p>${message}</p>`;
    output.scrollTop = output.scrollHeight;  // Scroll vers le bas pour voir le dernier message
}
