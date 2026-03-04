import axios from "axios";
import { cache } from "../utils/cache.js";
import { mockTeams, mockPlayersByTeam } from "../data/mockData.js";

const sportdataClient = axios.create({
    baseURL: "https://api.sportsdata.io/v3",
    params: {
        key: process.env.SPORTSDATA_API_KEY,
    },
    timeout: 2000 // 5 segundos de timeout
});

console.log("🔑 API Key configured:", process.env.SPORTSDATA_API_KEY ? "✅ Yes" : "❌ No");

export const fetchAllTeamsFromApi = async () => {
    try {
        const cachedTeams = cache.get("allTeams");
        if (cachedTeams) {
            return cachedTeams;
        }
        const response = await sportdataClient.get("/mlb/scores/json/AllTeams");
        cache.set("allTeams", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ SportsData AllTeams Error:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            message: error.message,
            url: error.config?.url
        });
        return mockTeams;
    }
};

export const fetchPlayersByTeamsFromAPi = async (key) => {
    try {
        const cacheKey = `players_${key}`;
        const cachedPlayers = cache.get(cacheKey);
        if (cachedPlayers) {
            return cachedPlayers;
        }

        console.log(`📡 Making request to SportsData API for team ${key}...`);
        const response = await sportdataClient.get(`/mlb/scores/json/Players/${key}`);
        console.log(`✅ SportsData response: ${response.status}, ${response.data?.length || 0} players`);

        // Guardar en cache
        cache.set(cacheKey, response.data);
        return response.data;
    } catch (error) {
        console.error(`❌ SportsData Players Error for ${key}:`, {
            status: error.response?.status,
            statusText: error.response?.statusText,
            message: error.message,
            url: error.config?.url
        });

        // Fallback a datos mock
        console.log(`📦 Using mock data as fallback for team ${key}...`);
        const mockPlayers = mockPlayersByTeam[key] || [];
        cache.set(`players_${key}`, mockPlayers);
        return mockPlayers;
    }
};