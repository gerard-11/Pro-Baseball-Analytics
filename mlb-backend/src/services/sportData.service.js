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
        const response = await sportdataClient.get(`/mlb/scores/json/Players/${key}`);
        cache.set(cacheKey, response.data);
        return response.data;
    } catch (error) {
        console.error(`❌ SportsData Players Error for ${key}:`, {
            status: error.response?.status,
            statusText: error.response?.statusText,
            message: error.message,
            url: error.config?.url
        });
        const mockPlayers = mockPlayersByTeam[key] || [];
        cache.set(`players_${key}`, mockPlayers);
        return mockPlayers;
    }
};