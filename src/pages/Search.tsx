import { useState, useEffect } from "react";
import { searchPlayers } from "../api/searchPlayers.service";
import type { Player } from "../types/player";
import { PlayerCard } from "../components/playerCard";
import { useDreamTeamContext } from "../context/DreamTeamContext";
import { Toast } from "../components/Toast";
import { Loader } from "../components/Loader";
import type { ToastType } from "../components/Toast";

interface SearchResult extends Player {
    TeamName?: string;
}

export const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState<ToastType>("success");

    const { dreamTeam, addPlayer, removePlayer } = useDreamTeamContext();

    // Debounce de búsqueda
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim()) {
                setLoading(true);
                try {
                    const searchResults = await searchPlayers(query);
                    setResults(searchResults);
                    setHasSearched(true);
                } catch (error) {
                    console.error("Error searching:", error);
                    setResults([]);
                    setHasSearched(true);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
                setHasSearched(false);
            }
        }, 500); // Esperar 500ms después de que el usuario deje de escribir

        return () => clearTimeout(timer);
    }, [query]);

    const handleAddToDreamTeam = (player: Player) => {
        addPlayer(player);
        setToastMessage(`${player.FirstName} ${player.LastName} added to Dream Team!`);
        setToastType("success");
        setShowToast(true);
    };

    const handleRemoveFromDreamTeam = (player: Player) => {
        const dreamTeamPlayer = dreamTeam.players.find(
            p => p.FirstName === player.FirstName && p.LastName === player.LastName && p.Team === player.Team
        );
        if (dreamTeamPlayer) {
            removePlayer(dreamTeamPlayer.dreamTeamId);
            setToastMessage(`${player.FirstName} ${player.LastName} removed from Dream Team!`);
            setToastType("success");
            setShowToast(true);
        }
    };

    const isPlayerInDreamTeam = (player: Player) => {
        return dreamTeam.players.some(
            p => p.FirstName === player.FirstName && p.LastName === player.LastName && p.Team === player.Team
        );
    };

    return (
        <>
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                duration={3000}
                type={toastType}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
                            🔍 Search Players
                        </h1>
                        <p className="text-center text-gray-600 mb-8">
                            Find any MLB player and add them to your Dream Team
                        </p>

                        {/* Search Input */}
                        <div className="max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search by player name, position, or team..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full px-6 py-4 text-lg border-2 border-blue-400 rounded-lg focus:outline-none focus:border-blue-600 shadow-md transition"
                            />
                        </div>
                    </div>

                    {/* Results */}
                    <div>
                        {loading && <Loader message="Buscando jugadores..." size="medium" />}

                        {hasSearched && results.length === 0 && !loading && (
                            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-lg">
                                <div className="text-6xl mb-4">🤔</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">No results found</h2>
                                <p className="text-gray-600 text-center max-w-md">
                                    Try searching with different keywords or check the spelling
                                </p>
                            </div>
                        )}

                        {results.length > 0 && (
                            <div className="mb-6">
                                <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
                                    <p className="text-blue-800 font-semibold">
                                        Found <span className="text-lg font-bold">{results.length}</span> player{results.length !== 1 ? "s" : ""}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                            {results.map((player, index) => (
                                <div key={`${player.Team}-${player.Jersey}-${index}`}>
                                    <PlayerCard
                                        PhotoUrl={player.PhotoUrl}
                                        Jersey={player.Jersey}
                                        FirstName={player.FirstName}
                                        LastName={player.LastName}
                                        Team={player.Team}
                                        Position={player.Position}
                                        BatHand={player.BatHand}
                                        onAddToDreamTeam={() => handleAddToDreamTeam(player)}
                                        onRemoveFromDreamTeam={() => handleRemoveFromDreamTeam(player)}
                                        isInDreamTeam={isPlayerInDreamTeam(player)}
                                    />
                                </div>
                            ))}
                        </div>

                        {!hasSearched && (
                            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-lg">
                                <div className="text-6xl mb-4">⚾</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Start your search</h2>
                                <p className="text-gray-600 text-center max-w-md">
                                    Type a player name, position (P, C, 1B, etc.) or team name to find players
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
