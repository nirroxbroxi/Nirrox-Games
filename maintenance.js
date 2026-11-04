// ==========================================
// CONFIGURATION DU SITE & MAINTENANCE - NIRROX GAMES
// ==========================================

// Ton ID JSONBin pour la gestion à distance
const BIN_ID = "6aeb24b8ffd5d16053a56644";

// Date exacte de lancement (Modifie si besoin)
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
  
  // Vérification de la maintenance au chargement de la page
  verifierEtAppliquerMaintenance();
});


// ------------------------------------------
// 2. GESTION DE LA MAINTENANCE À DISTANCE & DISCORD
// ------------------------------------------
async function verifierEtAppliquerMaintenance() {
    try {
        // Interrogation de ton JSONBin en direct (avec anti-cache)
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest?nocache=` + new Date().getTime());
        const data = await response.json();
        
        const modeMaintenance = data.record && data.record.maintenance === true;

        if (modeMaintenance) {
            // 1. Affichage de l'écran de maintenance sur le site
            document.body.innerHTML = `
                <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #0b0b0e; color: #fff; font-family: sans-serif; text-align: center; padding: 20px;">
                    <h1 style="font-size: 2.5rem; margin-bottom: 10px;">🚧 Site en Maintenance</h1>
                    <p style="color: #a0a0b0; font-size: 1.1rem; max-width: 500px;">
                        ${data.record.message || "Nirrox Games est actuellement en cours de mise à jour. Revenez très vite !"}
                    </p>
                </div>
            `;

            // 2. Gestion du Webhook Discord (si pas déjà envoyé)
            if (!localStorage.getItem("maintenance_discord_envoye")) {
                fetch(DISCORD_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: "Nirrox Bot",
                        embeds: [{
                            title: "🛠️ Mode Maintenance Activé",
                            description: "Le site **Nirrox Games** vient de passer en maintenance à distance. Les mises à jour sont en cours !",
                            color: 15158332,
                            footer: { text: "Nirrox Games - Notification Automatique" },
                            timestamp: new Date().toISOString()
                        }]
                    })
                })
                .then(res => {
                    if (res.ok) {
                        localStorage.setItem("maintenance_discord_envoye", "true");
                    }
                })
                .catch(error => console.error("Erreur Webhook Discord:", error));
            }
        } else {
            // Si le site n'est plus en maintenance, on nettoie le localStorage pour le prochain coup
            localStorage.removeItem("maintenance_discord_envoye");
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de la maintenance :", error);
    }
}
