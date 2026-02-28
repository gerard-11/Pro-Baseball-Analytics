import { useEffect, useState } from "react";
import { getTeams } from "../api/allTeams.service.ts";
import {TeamCard} from "../components/TeamCard";
import type {Team} from "../types/team.ts";

export const Teams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeamKey, setSelectedTeamKey] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTeams();
            setTeams(data);
        };
        fetchData();
    }, [selectedTeamKey]);

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
                MLB Teams
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {teams.map((team ) => (
                    <TeamCard
                        logo={team.WikipediaLogoUrl}
                        key={team.TeamID}
                        name={team.Name}
                        city={team.City}
                        onClick={() => setSelectedTeamKey(team.Key)}

                    />
                ))}
            </div>
        </div>
    );
};