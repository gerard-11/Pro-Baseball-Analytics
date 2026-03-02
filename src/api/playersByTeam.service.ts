import {apiClient} from "./apiClient.ts";

export const getPlayersByTeam= async (keyTeam:string) => {
    const response = await apiClient.get(`/playersByTeam/${keyTeam}`);
    return response.data;
};