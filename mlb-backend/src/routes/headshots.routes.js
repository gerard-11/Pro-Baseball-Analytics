import { Router } from "express";
import { getPlayerHeadshot } from "../services/mlbHeadshots.service.js";

const router = Router();

/**
 * GET /headshots/:firstName/:lastName
 * Obtiene el URL del headshot de un jugador
 * Query params:
 * - firstName: Nombre del jugador
 * - lastName: Apellido del jugador
 */
router.get("/:firstName/:lastName", async (req, res) => {
    const { firstName, lastName } = req.params;

    try {
        console.log(`🖼️ Fetching headshot for: ${firstName} ${lastName}`);

        const headshotURL = await getPlayerHeadshot(firstName, lastName);

        console.log(`✅ Headshot URL generated for ${firstName} ${lastName}`);

        return res.json({
            firstName,
            lastName,
            photoUrl: headshotURL
        });

    } catch (error) {
        console.error("❌ Error getting headshot:", error.message);
        return res.status(500).json({
            message: "Error fetching player headshot",
            error: error.message
        });
    }
});

export default router;
