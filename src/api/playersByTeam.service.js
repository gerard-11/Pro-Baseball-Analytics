import {apiClient} from "./apiClient.ts";

export const getPlayersByTeam= async () => {
    const response = await apiClient.get("/playersByTeam");
    return response.data;
};