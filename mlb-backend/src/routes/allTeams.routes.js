import { Router } from "express";
import {fetchAllTeamsFromApi} from "../services/sportData.service.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        console.log("🏟️ Fetching teams...");
        const teams = await fetchAllTeamsFromApi();
        console.log("✅ Teams fetched successfully:", teams?.length || 0, "teams");
        return res.json(teams);
    } catch (error) {
        console.error("❌ Error:", error.message);
        return res.status(500).json({
            message: "Error fetching teams",
            error: error.message
        });
    }
});

export default router;