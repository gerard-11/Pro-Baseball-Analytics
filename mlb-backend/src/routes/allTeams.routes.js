import { Router } from "express";
import {fetchAllTeamsFromApi} from "../services/sportData.service.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        console.log("🏟️ Fetching teams...");
        const teams = await fetchAllTeamsFromApi();

        return res.json(teams);
    } catch (error) {

        return res.status(500).json({
            message: "Error fetching teams",
            error: error.message
        });
    }
});

export default router;