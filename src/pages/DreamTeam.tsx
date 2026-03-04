import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useDreamTeamContext } from '../context/DreamTeamContext';
import { PositionSlot } from '../components/PositionSlot';
import { AvailablePlayerItem } from '../components/AvailablePlayerItem';
import type { Position } from '../types/dreamTeam';

export const DreamTeam = () => {
    const { dreamTeam, assignPosition, unassignPosition, removePlayer, clearDreamTeam } =
        useDreamTeamContext();

    const availablePlayers = dreamTeam.players.filter(player => {
        return !Object.values(dreamTeam.positions).some(p => p?.dreamTeamId === player.dreamTeamId);
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const playerId = active.id as string;
        const targetPosition = over.id as Position;

        assignPosition(playerId, targetPosition);
    };

    const handleExport = () => {
        const exportData = {
            timestamp: new Date().toISOString(),
            dreamTeam: dreamTeam.positions,
            players: dreamTeam.players,
        };
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `dream-team-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleCopy = () => {
        const exportData = {
            timestamp: new Date().toISOString(),
            dreamTeam: dreamTeam.positions,
        };
        navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
        alert('Dream Team copied to clipboard!');
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
                        My Dream Team
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        Drag players to their positions to build your perfect lineup
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Field */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-blue-200">
                                {/* Baseball Field with Grid Layout */}
                                <div className="w-full">
                                    {/* Top - Pitcher */}
                                    <div className="flex justify-center mb-8">
                                        <PositionSlot
                                            position="P"
                                            player={dreamTeam.positions['P']}
                                            onRemovePlayer={() => unassignPosition('P')}
                                        />
                                    </div>

                                    {/* Outfield row with CF in middle */}
                                    <div className="flex justify-between gap-4 mb-12">
                                        <PositionSlot
                                            position="LF"
                                            player={dreamTeam.positions['LF']}
                                            onRemovePlayer={() => unassignPosition('LF')}
                                        />
                                        <div className="flex-1 flex justify-center">
                                            <PositionSlot
                                                position="CF"
                                                player={dreamTeam.positions['CF']}
                                                onRemovePlayer={() => unassignPosition('CF')}
                                            />
                                        </div>
                                        <PositionSlot
                                            position="RF"
                                            player={dreamTeam.positions['RF']}
                                            onRemovePlayer={() => unassignPosition('RF')}
                                        />
                                    </div>

                                    {/* Infield - Top row (3B, SS, 2B) */}
                                    <div className="flex justify-center gap-8 mb-8">
                                        <PositionSlot
                                            position="3B"
                                            player={dreamTeam.positions['3B']}
                                            onRemovePlayer={() => unassignPosition('3B')}
                                        />
                                        <PositionSlot
                                            position="SS"
                                            player={dreamTeam.positions['SS']}
                                            onRemovePlayer={() => unassignPosition('SS')}
                                        />
                                        <PositionSlot
                                            position="2B"
                                            player={dreamTeam.positions['2B']}
                                            onRemovePlayer={() => unassignPosition('2B')}
                                        />
                                    </div>

                                    {/* Infield - Bottom row (1B, C) */}
                                    <div className="flex justify-center gap-16">
                                        <PositionSlot
                                            position="1B"
                                            player={dreamTeam.positions['1B']}
                                            onRemovePlayer={() => unassignPosition('1B')}
                                        />
                                        <PositionSlot
                                            position="C"
                                            player={dreamTeam.positions['C']}
                                            onRemovePlayer={() => unassignPosition('C')}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-12 flex gap-4 justify-center flex-wrap">
                                    <button
                                        onClick={clearDreamTeam}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                                    >
                                        Clear Dream Team
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                                    >
                                        Copy to Clipboard
                                    </button>
                                    <button
                                        onClick={handleExport}
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                                    >
                                        Export as JSON
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Available Players Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span>🏟️</span>
                                    Available Players ({availablePlayers.length})
                                </h2>
                                <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                                    <style>{`
                                        div::-webkit-scrollbar {
                                            width: 6px;
                                        }
                                        div::-webkit-scrollbar-track {
                                            background: #f1f1f1;
                                            border-radius: 10px;
                                        }
                                        div::-webkit-scrollbar-thumb {
                                            background: #3b82f6;
                                            border-radius: 10px;
                                        }
                                        div::-webkit-scrollbar-thumb:hover {
                                            background: #2563eb;
                                        }
                                    `}</style>
                                    {availablePlayers.length === 0 ? (
                                        <div className="text-center text-gray-500 py-8">
                                            <p className="text-2xl mb-2">🎉</p>
                                            <p>All players assigned!</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {availablePlayers.map(player => (
                                                <AvailablePlayerItem
                                                    key={player.dreamTeamId}
                                                    player={player}
                                                    onRemove={() => removePlayer(player.dreamTeamId)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DndContext>
    );
};
