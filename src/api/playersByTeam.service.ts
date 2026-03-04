import {apiClient} from "./apiClient.ts";

export const getPlayersByTeam = async (keyTeam: string) => {
    try {
        console.log(`📡 Fetching players for team: ${keyTeam}`);
        const response = await apiClient.get(`/playersByTeam/${keyTeam}`);
        console.log(`✅ Players data received for ${keyTeam}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`❌ Error fetching players for team ${keyTeam}:`, error);
        throw error;
    }
};