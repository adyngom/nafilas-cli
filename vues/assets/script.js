document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.querySelector('#calendar tbody');

    // Nombre de jours dans le mois de Ramadan
    const daysInRamadan = 30;

    // Obtenir le jour actuel du Ramadan
    const currentDayOfRamadan = await getCurrentDayOfRamadan();

    // Construire le calendrier avec 7 colonnes pour les jours
    for (let i = 0; i < daysInRamadan; i++) {
        // Créer une nouvelle ligne pour chaque semaine
        if (i % 7 === 0) {
            var tr = document.createElement('tr');
            tbody.appendChild(tr);
        }

        // Créer une cellule pour chaque jour
        var td = document.createElement('td');
        td.setAttribute('id', i + 1); // ID du jour (1-30)
        td.textContent = i + 1; // Numéro du jour
        tr.appendChild(td);

        // Sélectionner automatiquement le jour actuel du Ramadan
        if (i + 1 == currentDayOfRamadan) {
            td.setAttribute('class', 'current-day');
            const nafilasInfo = await fetchNafilasInfo(currentDayOfRamadan); // Récupérer les informations sur les Nafilas
            displayNafilasInfo(nafilasInfo); // Afficher les informations sur les Nafilas
        }

        // Ajouter un écouteur d'événements de clic pour afficher les informations sur les Nafilas
        td.addEventListener('click', async () => {
            td.classList.toggle('selected-day');
            const selectedDay = document.getElementById((i + 1)).textContent; // Jour sélectionné
            const nafilasInfo = await fetchNafilasInfo(parseInt(selectedDay)); // Récupérer les informations sur les Nafilas
            displayNafilasInfo(nafilasInfo); // Afficher les informations sur les Nafilas
        });
    }
});

// Fonction pour récupérer le jour actuel du Ramadan
async function getCurrentDayOfRamadan() {
    try {
        // Utiliser fetch() pour interroger l'API et récupérer le jour actuel du Ramadan
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        const response = await fetch(`http://api.aladhan.com/v1/gToH/${formattedDate}`);
        const currentDay = await response.json();
        return currentDay['data']['hijri']['day'];
    } catch (error) {
        console.error('Error fetching current day of Ramadan:', error);
    }
}

// Fonction pour récupérer les informations sur les Nafilas pour une date donnée
async function fetchNafilasInfo(day) {
    try {
        // Utilisez fetch() pour interroger l'API et récupérer les informations sur les Nafilas pour le jour donné
        const response = await fetch(`/nafilas/${day}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Nafilas info:', error);
    }
}

// Fonction pour afficher les informations sur les Nafilas dans l'interface utilisateur
function displayNafilasInfo(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Nafilas information for day ${data.night}</h2>
        <p>Number of Rakkas: ${data.rakkas}</p>
        <p>Number of Sallamas: ${data.sallama}</p>
        <h3>Recitations:</h3>
        <ul>
            ${data.recite.map(recitation => `<li>${recitation.suraName}: ${recitation.times}</li>`).join('')}
        </ul>
        <p>Rewards: ${data.rewards}</p>
    `;
}
