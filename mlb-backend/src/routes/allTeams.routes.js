import { Router } from "express";
import {fetchAllTeamsFromApi} from "../services/sportData.service.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const teams = await fetchAllTeamsFromApi();
        return res.json(teams);
    } catch (error) {
        console.error("SPORTDATA ERROR:", error.response?.data);
        return res.status(500).json({ message: "Error fetching teams" });
    }
});

export default router;