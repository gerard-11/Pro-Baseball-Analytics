import axios from "axios";
import dotenv from "dotenv";



const sportdataClient = axios.create({
    baseURL: "https://api.sportsdata.io/v3",
    params: {
        key: process.env.SPORTSDATA_API_KEY,
    },
});

export const fetchAllTeamsFromApi = async () => {
    const response = await sportdataClient.get(
        "/mlb/scores/json/AllTeams",
    );

    return response.data;
};
export const fetchStandingsFromAPI = async () => {
    return sportdataClient.get("/mlb/scores/json/Standings/2026");
};