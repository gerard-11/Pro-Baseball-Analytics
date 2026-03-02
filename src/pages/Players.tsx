import {useEffect, useState} from "react";
import { getPlayersByTeam } from '../api/playersByTeam.service.ts'
import {useParams} from "react-router-dom";
import type {Player} from "../types/player.ts";
import {PlayerCard} from "../components/playerCard.tsx";


const Players = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const { keyTeam } = useParams();

    useEffect(() => {
        if(!keyTeam) return;
        const fetchData = async () => {
            const data = await getPlayersByTeam(keyTeam);
            console.log(data);
            setPlayers(data);
        };
        fetchData();
    }, [keyTeam]);

    return (

    <div>
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


    );
};

export { Players }