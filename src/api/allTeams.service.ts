import { apiClient } from "./apiClient.ts"


export const getTeams = async () => {
    const response = await apiClient.get("/allTeams");
    return response.data;
};