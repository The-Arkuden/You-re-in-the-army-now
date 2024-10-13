const battlefieldDisplay = document.getElementById('battlefield-display');
const statusDisplay = document.getElementById('status-display');
const endGameSection = document.getElementById('end-game');
const resultDisplay = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

let playerArmy = {
    infantry: { units: 50, morale: 80, traits: ["Fierce", "Tactician"] },
    archers: { units: 40, morale: 75, traits: ["Stealthy"] },
    cavalry: { units: 30, morale: 70, traits: ["Swift"] },
};

let enemyArmy = {
    infantry: { units: 50, morale: 80, traits: ["Fierce", "Defensive"] },
    archers: { units: 40, morale: 75, traits: ["Stealthy"] },
    cavalry: { units: 30, morale: 70, traits: ["Swift"] },
};

let turnCounter = 0; // Pour gérer les tours

function updateBattlefield() {
    const battlefield = `
    Votre Armée:
    Infanterie: ${playerArmy.infantry.units} unités (Moral: ${playerArmy.infantry.morale}%)
    Archers: ${playerArmy.archers.units} unités (Moral: ${playerArmy.archers.morale}%)
    Cavalerie: ${playerArmy.cavalry.units} unités (Moral: ${playerArmy.cavalry.morale}%)

    Armée Ennemie:
    Infanterie: ${enemyArmy.infantry.units} unités (Moral: ${enemyArmy.infantry.morale}%)
    Archers: ${enemyArmy.archers.units} unités (Moral: ${enemyArmy.archers.morale}%)
    Cavalerie: ${enemyArmy.cavalry.units} unités (Moral: ${enemyArmy.cavalry.units}%)`;
    battlefieldDisplay.textContent = battlefield;
}

function calculateDamage(attacker, defender) {
    const baseDamage = Math.floor(Math.random() * 10) + 5; // Dégâts de base
    const traitBonus = attacker.traits.includes("Fierce") ? 2 : 0; // Bonus de traits
    return Math.max(0, baseDamage + traitBonus);
}

function resolveBattle(action) {
    // Résolution des actions
    let playerDamage = 0;
    let enemyDamage = 0;

    if (action === "attack") {
        playerDamage = calculateDamage(playerArmy.infantry, enemyArmy.infantry);
        enemyArmy.infantry.units -= playerDamage;
        enemyArmy.infantry.morale -= Math.floor(playerDamage / 5); // Morale réduit par rapport aux dégâts

        // L'ennemi réagit
        enemyDamage = calculateDamage(enemyArmy.infantry, playerArmy.infantry);
        playerArmy.infantry.units -= enemyDamage;
        playerArmy.infantry.morale -= Math.floor(enemyDamage / 5);
    } else if (action === "defend") {
        // Défense, les unités subissent moins de dégâts
        enemyDamage = Math.floor(calculateDamage(enemyArmy.infantry, playerArmy.infantry) / 2);
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

function checkEndGame() {
    if (playerArmy.infantry.units <= 0) {
        endGameSection.style.display = "block";
        resultDisplay.textContent = "Votre armée a été vaincue !";
    } else if (enemyArmy.infantry.units <= 0) {
        endGameSection.style.display = "block";
        resultDisplay.textContent = "Vous avez gagné la bataille !";
    }
}

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
    // Passer au tour suivant, avec une logique d'attaque ennemie
    enemyArmy.infantry.units -= Math.floor(Math.random() * 3); // Exemples d'attaques ennemies aléatoires
    if (enemyArmy.infantry.units < 0) enemyArmy.infantry.units = 0;

    // Mettre à jour le champ de bataille
    updateBattlefield();
    checkEndGame();
}

document.getElementById('attack-btn').addEventListener('click', attack);
document.getElementById('defend-btn').addEventListener('click', defend);
document.getElementById('retreat-btn').addEventListener('click', retreat);
document.getElementById('next-turn-btn').addEventListener('click', nextTurn);
restartBtn.addEventListener('click', () => {
    location.reload();
});

// Initialiser l'affichage du champ de bataille
updateBattlefield();
// Définition des escouades et de leurs caractéristiques
const squads = {
    infantry: { name: "Infanterie", units: 50, morale: 80, damage: 5, traits: ["Fierce", "Tactician"] },
    archers: { name: "Archers", units: 40, morale: 75, damage: 4, traits: ["Stealthy", "Precise"] },
    cavalry: { name: "Cavalerie", units: 30, morale: 70, damage: 6, traits: ["Swift", "Charge"] },
    pikemen: { name: "Piquiers", units: 35, morale: 65, damage: 5, traits: ["Defensive"] },
};

// Initialisation des armées avec les escouades
let playerArmy = {
    infantry: {...squads.infantry},
    archers: {...squads.archers},
    cavalry: {...squads.cavalry},
};

let enemyArmy = {
    infantry: {...squads.infantry},
    archers: {...squads.archers},
    cavalry: {...squads.cavalry},
};

function calculateDamage(attacker) {
    const baseDamage = attacker.damage + Math.floor(Math.random() * 3); // Dégâts avec un aléatoire
    const traitBonus = attacker.traits.includes("Fierce") ? 2 : 0; // Bonus de traits
    return Math.max(0, baseDamage + traitBonus);
}

function resolveBattle(action) {
    let playerDamage = 0;
    let enemyDamage = 0;

    if (action === "attack") {
        playerDamage = calculateDamage(playerArmy.infantry);
        enemyArmy.infantry.units -= playerDamage;
        enemyArmy.infantry.morale -= Math.floor(playerDamage / 10); // Morale réduit par rapport aux dégâts

        enemyDamage = calculateDamage(enemyArmy.infantry);
        playerArmy.infantry.units -= enemyDamage;
        playerArmy.infantry.morale -= Math.floor(enemyDamage / 10);
    } else if (action === "defend") {
        // Défense, les unités subissent moins de dégâts
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

// Ajouter les attaques ennemies
function enemyAttack() {
    let damage = calculateDamage(enemyArmy.infantry);
    playerArmy.infantry.units -= damage;
    playerArmy.infantry.morale -= Math.floor(damage / 10);
}

function checkEndGame() {
    if (playerArmy.infantry.units <= 0) {
        endGameSection.style.display = "block";
        resultDisplay.textContent = "Votre armée a été vaincue !";
    } else if (enemyArmy.infantry.units <= 0) {
        endGameSection.style.display = "block";
        resultDisplay.textContent = "Vous avez gagné la bataille !";
    }
}

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
    enemyAttack(); // L'ennemi attaque à chaque tour
    updateBattlefield();
    checkEndGame();
}

document.getElementById('attack-btn').addEventListener('click', attack);
document.getElementById('defend-btn').addEventListener('click', defend);
document.getElementById('retreat-btn').addEventListener('click', retreat);
document.getElementById('next-turn-btn').addEventListener('click', nextTurn);
restartBtn.addEventListener('click', () => {
    location.reload();
});

// Initialiser l'affichage du champ de bataille
updateBattlefield();
