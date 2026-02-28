import {useEffect, useState} from "react";
import { getPlayersByTeam } from '../api/playersByTeam.service.js'


const Players = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPlayersByTeam();
            console.log(data);
            setPlayers(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Players</h1>

        </div>
    );
};

export { Players }