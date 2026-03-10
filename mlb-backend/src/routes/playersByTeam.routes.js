import { Router } from "express";
import {fetchAllTeamsFromApi, fetchPlayersByTeamsFromAPi} from "../services/sportData.service.js";
import { getPlayerHeadshot } from "../services/mlbHeadshots.service.js";

const router = Router();

router.get("/:key", async (req, res) => {
    const { params: { key } } = req;
    try {
        console.log(`👥 Fetching data for team: ${key}`);
        const players = await fetchPlayersByTeamsFromAPi(key);
        const activePlayers = players.filter((player) => player.Status === "Active");
        console.log(`✅ Active players found: ${activePlayers.length}`);

        const teams = await fetchAllTeamsFromApi();
        const teamMatch = teams.find(t => String(t.Key).toLowerCase() === String(key).toLowerCase());

        const teamData = {
            name: teamMatch?.Name || "Team Not Found",
            logo: teamMatch?.WikipediaLogoUrl || null
        };

        // Obtener headshots para cada jugador
        console.log(`🖼️ Fetching headshots for ${activePlayers.length} players...`);
        const playersWithHeadshots = await Promise.all(
            activePlayers.map(async (player) => {
                try {
                    const photoUrl = await getPlayerHeadshot(player.FirstName, player.LastName);
                    return {
                        ...player,
                        PhotoUrl: photoUrl || player.PhotoUrl // Usa la URL obtenida o la existente
                    };
                } catch (error) {
                    console.warn(`⚠️ Could not fetch headshot for ${player.FirstName} ${player.LastName}`);
                    return player; // Retorna el jugador sin cambios si hay error
                }
            })
        );

        console.log(`✅ Response ready for ${teamData.name}: ${playersWithHeadshots.length} players`);

        return res.json({
            team: teamData.name,
            logo: teamData.logo,
            activePlayers: playersWithHeadshots
        });

    } catch (error) {
        console.error("❌ Error:", error.message);
        return res.status(500).json({
            message: "Error fetching players",
            error: error.message
        });
    }
});

export default router;