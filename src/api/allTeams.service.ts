import { apiClient } from "./apiClient.ts"


export const getTeams = async () => {
    try {
        const response = await apiClient.get("/allTeams");
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching teams:", error);
        throw error;
    }
};