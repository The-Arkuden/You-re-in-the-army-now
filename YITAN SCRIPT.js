// Définition des escouades et de leurs caractéristiques
const squads = {
    infantry: { name: "Infanterie", units: 50, morale: 80, damage: 5, traits: ["Fierce", "Tactician"] },
    archers: { name: "Archers", units: 40, morale: 75, damage: 4, traits: ["Stealthy", "Precise"] },
    cavalry: { name: "Cavalerie", units: 30, morale: 70, damage: 6, traits: ["Swift", "Charge"] },
    pikemen: { name: "Piquiers", units: 35, morale: 65, damage: 5, traits: ["Defensive"] },
};

// Initialisation des armées
let playerArmy = {};
let enemyArmy = {};
let turnCounter = 0; // Pour gérer les tours

function initializeArmies() {
    playerArmy = {
        infantry: { ...squads.infantry },
        archers: { ...squads.archers },
        cavalry: { ...squads.cavalry },
    };

    enemyArmy = {
        infantry: { ...squads.infantry },
        archers: { ...squads.archers },
        cavalry: { ...squads.cavalry },
    };
}

function startBattle() {
    initializeArmies();
    updateBattlefield();
}

// Calculer les dégâts d'un attaquant
function calculateDamage(attacker) {
    const baseDamage = attacker.damage + Math.floor(Math.random() * 3);
    const traitBonus = attacker.traits.includes("Fierce") ? 2 : 0;
    return Math.max(0, baseDamage + traitBonus);
}

// Résoudre le combat selon l'action du joueur
function resolveBattle(action) {
    let playerDamage = 0;
    let enemyDamage = 0;

    if (action === "attack") {
        playerDamage = calculateDamage(playerArmy.infantry);
        enemyArmy.infantry.units -= playerDamage;
        enemyArmy.infantry.morale -= Math.floor(playerDamage / 10);

        enemyDamage = calculateDamage(enemyArmy.infantry);
        playerArmy.infantry.units -= enemyDamage;
        playerArmy.infantry.morale -= Math.floor(enemyDamage / 10);
    } else if (action === "defend") {
        enemyDamage = Math.floor(calculateDamage(enemyArmy.infantry) / 2);
        playerArmy.infantry.units -= enemyDamage;
    } else if (action === "retreat") {
        playerArmy.infantry.units -= 5; // Perte d'unités lors de la retraite
    }

    // Assurer que le nombre d'unités ne soit pas négatif
    if (enemyArmy.infantry.units < 0) enemyArmy.infantry.units = 0;
    if (playerArmy.infantry.units < 0) playerArmy.infantry.units = 0;

    // Vérifier le moral
    if (playerArmy.infantry.morale < 0) playerArmy.infantry.morale = 0;
    if (enemyArmy.infantry.morale < 0) enemyArmy.infantry.morale = 0;
}

// Attaque de l'ennemi
function enemyAttack() {
    let damage = calculateDamage(enemyArmy.infantry);
    playerArmy.infantry.units -= damage;
    playerArmy.infantry.morale -= Math.floor(damage / 10);
}

// Événements aléatoires qui se produisent pendant la bataille
function randomEvent() {
    const events = [
        { message: "Un renfort arrive!", effect: () => enemyArmy.infantry.units += 5 },
        { message: "Une pluie soudaine diminue la précision des archers ennemis.", effect: () => enemyArmy.archers.damage -= 1 },
        { message: "Une charge audacieuse des cavaliers!", effect: () => playerArmy.cavalry.units += 5 },
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    event.effect();
    return event.message;
}

// Vérification de l'état de fin de partie
function checkEndGame() {
    if (playerArmy.infantry.units <= 0) {
        endGameSection.style.display = "block";
        resultDisplay.textContent = "Votre armée a été vaincue !";
    } else if (enemyArmy.infantry.units <= 0) {
        endGameSection.style.display = "block";
        resultDisplay.textContent = "Vous avez gagné la bataille !";
    }
}

// Actions du joueur
function attack() {
    resolveBattle("attack");
    updateBattlefield();
    checkEndGame();
}

function defend() {
    resolveBattle("defend");
    updateBattlefield();
    checkEndGame();
}

function retreat() {
    resolveBattle("retreat");
    updateBattlefield();
    checkEndGame();
}

function nextTurn() {
    // L'ennemi attaque à chaque tour
    enemyAttack();
    // Ajout d'un événement aléatoire
    const eventMessage = randomEvent();
    updateBattlefield();
    checkEndGame();
}

// Gestion des événements des boutons
document.getElementById('attack-btn').addEventListener('click', attack);
document.getElementById('defend-btn').addEventListener('click', defend);
document.getElementById('retreat-btn').addEventListener('click', retreat);
document.getElementById('next-turn-btn').addEventListener('click', nextTurn);
restartBtn.addEventListener('click', () => {
    location.reload();
});

// Initialiser l'affichage du champ de bataille
startBattle();

// Mise à jour de l'affichage du champ de bataille
function updateBattlefield() {
    // Afficher les unités et le moral des armées
    document.getElementById('player-infantry-units').textContent = playerArmy.infantry.units;
    document.getElementById('player-infantry-morale').textContent = playerArmy.infantry.morale;
    
    document.getElementById('enemy-infantry-units').textContent = enemyArmy.infantry.units;
    document.getElementById('enemy-infantry-morale').textContent = enemyArmy.infantry.morale;

    // Ajouter d'autres mises à jour pour les archers, cavalerie, etc. ici
}
