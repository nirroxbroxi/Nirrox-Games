// ==========================================
// CONFIGURATION DE LA MAINTENANCE & DISCORD
// ==========================================

// 'true' = Site bloqué en Maintenance | 'false' = Site Ouvert
const EST_EN_MAINTENANCE = false; 

// Webhook Discord pour notifications automatiques
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1567243944016744570/L2ZtLq84AaiL7nTiRa3X6FS8C1U944OfWJzczzt8HqHsbrTcIoXL9JHMlk9_XrNhmEoi";

// Gestion de la maintenance et du bot Discord
if (EST_EN_MAINTENANCE) {
    // 1. Affichage de la page de maintenance
    document.addEventListener("DOMContentLoaded", () => {
        document.body.innerHTML = `
            <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #09090b; color: #fafafa; font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 20px;">
                <h1 style="font-size: 2.5rem; margin-bottom: 10px;">🚧 Site en Maintenance</h1>
                <p style="color: #a1a1aa; font-size: 1.1rem; max-width: 500px;">
                    Nirrox Games est actuellement en cours de mise à jour. Revenez très vite !
                </p>
            </div>
        `;
    });

    // 2. Envoi de l'alerte sur Discord (si pas déjà envoyée)
    if (!localStorage.getItem("maintenance_discord_envoye")) {
        fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "Nirrox Bot",
                embeds: [{
                    title: "🛠️ Mode Maintenance Activé",
                    description: "Le site **Nirrox Games** vient de passer en maintenance. Les mises à jour sont en cours !",
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
    // Si le site n'est plus en maintenance, on réinitialise l'alerte pour la prochaine fois
    localStorage.removeItem("maintenance_discord_envoye");
}
