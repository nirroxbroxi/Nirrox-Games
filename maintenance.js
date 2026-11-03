// ==========================================
// CONFIGURATION DE LA MAINTENANCE - NIRROX GAMES
// ==========================================

// 'true' = Site bloqué en Maintenance | 'false' = Site Ouvert
const modeMaintenance = false;

// Webhook Discord pour notifications
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1567243944016744570/L2ZtLq84AaiL7nTiRa3X6FS8C1U944OfWJzczzt8HqHsbrTcIoXL9JHMlk9_XrNhmEoi";

function gestionDiscordMaintenance() {
  if (modeMaintenance) {
    // Envoie la notification Discord UNIQUEMENT si cela n'a pas encore été fait pour ce cycle
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
    // Quand le site redevient ouvert (false), on réinitialise le verrou d'envoi Discord
    localStorage.removeItem("maintenance_discord_envoye");
  }
}

// Lancement automatique au chargement
gestionDiscordMaintenance();
