import { Router } from "express";
import { fetchAllTeamsFromApi, fetchPlayersByTeamsFromAPi } from "../services/sportData.service.js";
import { cache } from "../utils/cache.js";

const router = Router();

/**
 * GET /search?q=<query>
 * Busca jugadores en todos los equipos
 */
router.get("/", async (req, res) => {
    const { q: query } = req.query;

    try {
        if (!query || query.trim().length === 0) {
            return res.json([]);
        }

        const searchQuery = query.toLowerCase();
        console.log(`🔍 Backend search for: "${searchQuery}"`);

        // Verificar si ya está en caché
        const cacheKey = `search_${searchQuery}`;
        const cachedResults = cache.get(cacheKey);
        if (cachedResults) {
            console.log(`✅ Search results from cache for "${searchQuery}"`);
            return res.json(cachedResults);
        }

        // Obtener todos los equipos
        const teams = await fetchAllTeamsFromApi();
        console.log(`📚 Found ${teams.length} teams to search through`);

        // Buscar en todos los equipos en paralelo
        const searchPromises = teams.map(async (team) => {
            try {
                const players = await fetchPlayersByTeamsFromAPi(team.Key);
                const activePlayer = players.filter(p => p.Status === "Active");

                // Filtrar jugadores que coincidan
                return activePlayer
                    .filter(player =>
                        player.FirstName.toLowerCase().includes(searchQuery) ||
                        player.LastName.toLowerCase().includes(searchQuery) ||
                        player.Position.toLowerCase().includes(searchQuery) ||
                        team.Name.toLowerCase().includes(searchQuery) ||
                        team.Key.toLowerCase().includes(searchQuery)
                    )
                    .map(player => ({
                        ...player,
                        TeamName: team.Name,
                        TeamKey: team.Key
                    }));
            } catch (error) {
                console.warn(`⚠️ Error searching team ${team.Key}:`, error.message);
                return [];
            }
        });

        // Esperar a todas las búsquedas en paralelo
        const results = await Promise.all(searchPromises);
        const flatResults = results.flat();

        // Cachear resultados por 10 minutos
        cache.set(cacheKey, flatResults);

        console.log(`✅ Found ${flatResults.length} players matching "${searchQuery}"`);

        return res.json(flatResults);

    } catch (error) {
        console.error("❌ Search Error:", error.message);
        return res.status(500).json({
            message: "Error searching players",
            error: error.message
        });
    }
});

export default router;
