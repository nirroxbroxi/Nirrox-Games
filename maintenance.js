// ==========================================
// CONFIGURATION DU SITE & MAINTENANCE - NIRROX GAMES
// ==========================================

// 'true' = Site bloqué en Maintenance | 'false' = Site Ouvert
const modeMaintenance = false;

// Date exacte de lancement d'aujourd'hui (Modifie l'heure T19:00:00 selon l'heure exacte !)
const DATE_LANCEMENT_SITE = new Date("2026-11-03T19:00:00");

// Webhook Discord pour notifications
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1567243944016744570/L2ZtLq84AaiL7nTiRa3X6FS8C1U944OfWJzczzt8HqHsbrTcIoXL9JHMlk9_XrNhmEoi";

// ------------------------------------------
// 1. CHRONOMÈTRE / ÂGE DU SITE (EN ARRIÈRE-PLAN)
// ------------------------------------------
function mettreAJourAgeSite() {
  const elementCompteur = document.getElementById("compteur-age");
  if (!elementCompteur) return;

  const maintenant = new Date();
  const diffTemps = maintenant - DATE_LANCEMENT_SITE;

  if (diffTemps < 0) {
    elementCompteur.textContent = "Le site vient tout juste de naître !";
    return;
  }

  // Calculs jours, heures, minutes, secondes
  const jours = Math.floor(diffTemps / (1000 * 60 * 60 * 24));
  const heures = Math.floor((diffTemps / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffTemps / (1000 * 60)) % 60);
  const secondes = Math.floor((diffTemps / 1000) % 60);

  // Affichage dynamique en direct
  if (jours > 0) {
    elementCompteur.textContent = `${jours} jour(s), ${heures}h ${minutes}m ${secondes}s`;
  } else if (heures > 0) {
    elementCompteur.textContent = `${heures}h ${minutes}m ${secondes}s`;
  } else {
    elementCompteur.textContent = `${minutes} minute(s) et ${secondes} seconde(s)`;
  }
}

// Lancement de l'actualisation du chronomètre dès que la page est chargée, puis chaque seconde
document.addEventListener("DOMContentLoaded", () => {
  mettreAJourAgeSite();
  setInterval(mettreAJourAgeSite, 1000);
});


// ------------------------------------------
// 2. GESTION DU BOT DISCORD POUR MAINTENANCE
// ------------------------------------------
function gestionDiscordMaintenance() {
  if (modeMaintenance) {
    if (!localStorage.getItem("maintenance_discord_envoye")) {
      fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Nirrox Bot",
          embeds: [{
            title: "🛠️ Mode Maintenance Activé",
            description: "Le site **Nirrox Games** vient de passer en maintenance (Beta 1.1). Les mises à jour sont en cours !",
            color: 15158332,
            footer: { text: "Nirrox Games - Notification Automatique" },
            timestamp: new Date().toISOString()
          }]
        })
      })
      .then(response => {
        if (response.ok) {
          localStorage.setItem("maintenance_discord_envoye", "true");
        }
      })
      .catch(error => console.error("Erreur Webhook Discord:", error));
    }
  } else {
    localStorage.removeItem("maintenance_discord_envoye");
  }
}

// Lancement du contrôle de maintenance
gestionDiscordMaintenance();
