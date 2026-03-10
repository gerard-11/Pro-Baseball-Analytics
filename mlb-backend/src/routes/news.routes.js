import { Router } from "express";
import { getMLBNews } from "../services/news.service.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        console.log("📰 Fetching MLB news...");
        const news = await getMLBNews();

        return res.json(news);
    } catch (error) {
        console.error("❌ Error fetching news:", error);
        return res.status(500).json({
            message: "Error fetching news",
            error: error.message
        });
    }
});

export default router;
