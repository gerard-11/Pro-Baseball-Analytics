import { apiClient } from "./apiClient.ts"


export const getTeams = async () => {
    try {
        console.log("📡 Fetching teams from API...");
        const response = await apiClient.get("/allTeams");
        console.log("✅ Teams data received:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching teams:", error);
        throw error;
    }
};