// ==========================================
// CONFIGURATION DE LA MAINTENANCE - NIRROX GAMES
// ==========================================

// Active (true) ou Désactive (false) le mode maintenance
const modeMaintenance = true;

// Ton Webhook Discord configuré
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1567243944016744570/L2ZtLq84AaiL7nTiRa3X6FS8C1U944OfWJzczzt8HqHsbrTcIoXL9JHMlk9_XrNhmEoi";

function envoyerNotificationDiscord() {
  if (modeMaintenance) {
    // Vérification anti-spam via localStorage (1 seul envoi par cycle)
    if (!localStorage.getItem("maintenance_discord_envoye")) {
      fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "Nirrox Bot",
          embeds: [{
            title: "🛠️ Mode Maintenance Activé",
            description: "Le site **Nirrox Games** vient de passer en maintenance (Beta 1.0). Les mises à jour sont en cours !",
            color: 15158332, // Couleur rouge
            footer: { text: "Nirrox Games - Notification Automatique" },
            timestamp: new Date().toISOString()
          }]
        })
      })
      .then(response => {
        if (response.ok) {
          // Bloque les futurs envois pour éviter tout spam
          localStorage.setItem("maintenance_discord_envoye", "true");
          console.log("Notification Discord envoyée avec succès.");
        }
      })
      .catch(error => console.error("Erreur d'envoi Discord:", error));
    }
  } else {
    // Réinitialise le verrou dès que la maintenance passe sur false
    localStorage.removeItem("maintenance_discord_envoye");
  }
}

// Exécution au chargement du script
envoyerNotificationDiscord();
