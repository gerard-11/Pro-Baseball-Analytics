import { Router } from "express";
import { fetchPlayersByTeamsFromAPi} from "../services/sportData.service.js";

const router = Router();

router.get("/:key", async (req, res) => {
    const { params: { key } } = req;
    try {
        const players = await fetchPlayersByTeamsFromAPi(key);
        const activePlayers = players.filter((player) => player.Status === "Active")
        return res.json(activePlayers);
    } catch (error) {
        console.error("SPORTDATA ERROR:", error.response?.data);
        return res.status(500).json({ message: "Error fetching players" });
    }
});

export default router;