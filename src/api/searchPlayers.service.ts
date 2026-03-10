import { apiClient } from "./apiClient.ts";
import type { Player } from "../types/player.ts";

interface SearchResult extends Player {
    TeamName?: string;
    TeamKey?: string;
}

// Caché local de búsquedas
const searchCache = new Map<string, SearchResult[]>();

export const searchPlayers = async (query: string): Promise<SearchResult[]> => {
    try {
        if (!query.trim()) {
            return [];
        }

        const cacheKey = query.toLowerCase();

        // Verificar caché local
        if (searchCache.has(cacheKey)) {
            console.log(`✅ Search results from local cache for "${query}"`);
            return searchCache.get(cacheKey) || [];
        }

        console.log(`🔍 Searching for players: "${query}"`);

        // Usar el endpoint de búsqueda del backend
        const response = await apiClient.get("/search", {
            params: { q: query }
        });
        const results: SearchResult[] = response.data || [];

        // Guardar en caché local
        searchCache.set(cacheKey, results);

        console.log(`✅ Found ${results.length} players matching "${query}"`);
        return results;
    } catch (error) {
        console.error(`❌ Error searching players:`, error);
        throw error;
    }
};
