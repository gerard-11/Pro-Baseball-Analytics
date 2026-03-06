import { useEffect, useState } from "react";
import { getTeams } from "../api/allTeams.service.ts";
import {TeamCard} from "../components/TeamCard";
import type {Team} from "../types/team.ts";

export const Teams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getTeams();
                setTeams(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error al cargar equipos");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
                MLB Teams
            </h1>

            {loading && (
                <div className="text-center text-gray-600">
                    <p>Cargando equipos...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <p>Error: {error}</p>
                    <p className="text-sm mt-2">Verifica que el backend esté corriendo en http://localhost:3000</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {teams.map((team ) => (
                    <TeamCard
                        logo={team.WikipediaLogoUrl}
                        key={team.TeamId}
                        name={team.Name}
                        city={team.City}
                        keyTeam={team.Key}
                    />
                ))}
            </div>
        </div>
    );
};