import {useEffect, useState} from "react";
import { getPlayersByTeam } from '../api/playersByTeam.service.ts'
import {useParams} from "react-router-dom";
import type {Player} from "../types/player.ts";
import {PlayerCard} from "../components/playerCard.tsx";


const Players = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [team, setTeam] = useState([]);
    const { keyTeam } = useParams();

    useEffect(() => {
        if(!keyTeam) return;
        const fetchData = async () => {
            const {activePlayers, team} = await getPlayersByTeam(keyTeam);
            setPlayers(activePlayers);
            setTeam(team);
        };
        fetchData();
    }, [keyTeam]);

    return (
<>
    <h1 className="text-3xl text-center mb-3 font-bold text-red-700">{team}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {players.map((player) => (
            <PlayerCard
                PhotoUrl={player.PhotoUrl}
                key={player.Jersey}
                Jersey={player.Jersey}
                FirstName={player.FirstName}
                LastName={player.LastName}
                Team={player.Team}
                Position={player.Position}
                BatHand={player.BatHand}
            />
        ))}

    </div>
</>



    );
};

export { Players }