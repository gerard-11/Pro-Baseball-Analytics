import { Router } from "express";
import {fetchAllTeamsFromApi, fetchPlayersByTeamsFromAPi} from "../services/sportData.service.js";

const router = Router();

router.get("/:key", async (req, res) => {
    const { params: { key } } = req;
    try {
        const players = await fetchPlayersByTeamsFromAPi(key);
        const activePlayers = players.filter((player) => player.Status === "Active")
        const teams = await fetchAllTeamsFromApi(key);
        const teamMatch = teams.find(t => String(t.Key).toLowerCase() === String(key).toLowerCase());

        const teamData = {
            name: teamMatch?.Name || "Team Not Found",
            logo: teamMatch?.WikipediaLogoUrl || null
        };
        console.log('teamData',teamData);

        return res.json({
            team: teamData.name,
            logo: teamData.logo,
            activePlayers
        });



    } catch (error) {
        console.error("SPORT DATA ERROR:", error.response?.data);
        return res.status(500).json({ message: "Error fetching players" });
    }
});

export default router;