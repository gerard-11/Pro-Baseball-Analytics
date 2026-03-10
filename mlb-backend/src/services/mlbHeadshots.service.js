import axios from "axios";
import { cache } from "../utils/cache.js";

// MLB Stats API es gratuita y pública
const mlbStatsClient = axios.create({
    baseURL: "https://statsapi.mlb.com/api/v1",
    timeout: 5000
});

/**
 * Obtiene el ID de un jugador de MLB Stats API
 * @param {string} firstName - Nombre del jugador
 * @param {string} lastName - Apellido del jugador
 * @returns {Promise<string|null>} ID del jugador o null si no se encuentra
 */
export const getMLBPlayerID = async (firstName, lastName) => {
    try {
        const cacheKey = `mlb_playerid_${firstName}_${lastName}`.toLowerCase();
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        // Buscar en todos los jugadores
        const response = await mlbStatsClient.get("/sports/1/players", {
            params: {
                hydrate: "person"
            }
        });

        const player = response.data.people?.find(p =>
            p.firstName?.toLowerCase() === firstName.toLowerCase() &&
            p.lastName?.toLowerCase() === lastName.toLowerCase()
        );

        if (player?.id) {
            cache.set(cacheKey, player.id);
            return player.id;
        }

        return null;
    } catch (error) {
        console.error(`❌ MLB Stats API Error for ${firstName} ${lastName}:`, error.message);
        return null;
    }
};

/**
 * Construye la URL del headshot usando el ID del jugador
 * @param {string|number} playerID - ID del jugador de MLB
 * @returns {string} URL del headshot
 */
export const buildHeadshotURL = (playerID) => {
    if (!playerID) {
        return "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/generic/headshot/67/current";
    }

    return `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerID}/headshot/67/current`;
};

/**
 * Obtiene el headshot de un jugador
 * @param {string} firstName - Nombre del jugador
 * @param {string} lastName - Apellido del jugador
 * @returns {Promise<string>} URL del headshot
 */
export const getPlayerHeadshot = async (firstName, lastName) => {
    try {
        const playerID = await getMLBPlayerID(firstName, lastName);
        return buildHeadshotURL(playerID);
    } catch (error) {
        console.error(`❌ Error getting headshot for ${firstName} ${lastName}:`, error.message);
        return buildHeadshotURL(null); // Retorna imagen por defecto
    }
};
