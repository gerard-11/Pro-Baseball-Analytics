import {useEffect, useState} from "react";
import { getPlayersByTeam } from '../api/playersByTeam.service.ts'
import {useParams, useNavigate} from "react-router-dom";
import type {Player} from "../types/player.ts";
import {PlayerCard} from "../components/playerCard.tsx";
import { useTeamContext } from "../context/TeamContext";
import { useDreamTeamContext } from "../context/DreamTeamContext";


const Players = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [team, setTeam] = useState<string>('');
    const [logo,setLogo] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { keyTeam } = useParams();
    const navigate = useNavigate();
    const { setSelectedTeamKey, setTeamName, setTeamLogo, setPlayers: setContextPlayers } = useTeamContext();
    const { addPlayer } = useDreamTeamContext();
    console.log(players);

    const { dreamTeam } = useDreamTeamContext();

    const handleAddToDreamTeam = (player: Player) => {
        addPlayer(player);
        alert(`${player.FirstName} ${player.LastName} added to Dream Team!`);
    };

    const isPlayerInDreamTeam = (player: Player) => {
        return dreamTeam.players.some(
            p => p.FirstName === player.FirstName && p.LastName === player.LastName && p.Team === player.Team
        );
    };

    useEffect(() => {
        if(!keyTeam) {
            navigate('/teams', { replace: true });
            return;
        }

        // Siempre hacer fetch cuando keyTeam cambia para evitar cache stale
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log(`👥 Fetching players for team: ${keyTeam}`);
                const {activePlayers,team,logo} = await getPlayersByTeam(keyTeam);
                console.log(`👥 Players loaded for ${keyTeam}:`, activePlayers);
                setPlayers(activePlayers);
                setTeam(team);
                setLogo(logo);
                setSelectedTeamKey(keyTeam);
                setTeamName(team);
                setTeamLogo(logo);
                setContextPlayers(activePlayers);
                setError(null);
            } catch (err) {
                console.error("❌ Error loading players:", err);
                setError(err instanceof Error ? err.message : "Error al cargar jugadores");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [keyTeam, navigate, setSelectedTeamKey, setTeamName, setTeamLogo, setContextPlayers]);

    return (
        <>
            {loading && (
                <div className="text-center text-gray-600 py-8">
                    <p>Cargando jugadores...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    <p>Error: {error}</p>
                    <p className="text-sm mt-2">Verifica que el backend esté corriendo en http://localhost:3000</p>
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-white shadow-md rounded-xl border-b-4 border-red-700 mb-8">
                        {/* Contenedor del Logo con sombra y tamaño ajustado */}
                        <div className="flex-shrink-0 bg-gray-50 p-2 rounded-full shadow-inner border border-gray-100">
                            <img
                                src={logo}
                                alt={`Logo de ${team}`}
                                className="w-20 h-20 md:w-28 md:h-28 object-contain"
                            />
                        </div>

                        {/* Título con tipografía fuerte y acento en rojo */}
                        <div className="flex flex-col items-center md:items-start">
                            <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold">Active Roster Team</span>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">
                                {team}
                            </h1>
                            <div className="h-1.5 w-24 bg-blue-700 mt-1 rounded-full"></div>
                        </div>
                    </div>
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
                                    onAddToDreamTeam={() => handleAddToDreamTeam(player)}
                                    isInDreamTeam={isPlayerInDreamTeam(player)}
                                />
                                )
                        )}

                    </div>
                </>
            )}
        </>
    );
};

export { Players }