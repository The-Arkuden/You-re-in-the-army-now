// Variables de campagne
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
            <pre>${officier.visage}</pre>
            <p>Arme: ${officier.arme}</p>
        </div>`;
    });
}

// Fonction pour générer des officiers avec des visages ASCII et des caractéristiques aléatoires
function genererOfficiers(nombre) {
    const traitsVisage = {
        yeux: ['o o', 'O O', '- -', 'x x'],
        nez: [' | ', ' ^ ', ' v ', ' L '],
        bouche: ['---', '_ _', '~~~', '---']
    };
    
    const armes = ['Épée', 'Lance', 'Arc'];

    for (let i = 0; i < nombre; i++) {
        const yeux = traitsVisage.yeux[Math.floor(Math.random() * traitsVisage.yeux.length)];
        const nez = traitsVisage.nez[Math.floor(Math.random() * traitsVisage.nez.length)];
        const bouche = traitsVisage.bouche[Math.floor(Math.random() * traitsVisage.bouche.length)];

        const visage = `
        ${yeux}
         ${nez}
         ${bouche}`;

        officiers.push({
            nom: `Officier ${i + 1}`,
            visage: visage,
            arme: armes[Math.floor(Math.random() * armes.length)]
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
