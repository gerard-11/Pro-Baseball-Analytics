import axios from "axios";

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
export const fetchPlayersByTeamsFromAPi = async (key) => {
    const response= await sportdataClient.get(`/mlb/scores/json/PlayersBasic/${key}`);
    return response.data;
};