import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useDreamTeamContext } from '../context/DreamTeamContext';
import { PositionSlot } from '../components/PositionSlot';
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
                        {/* Main Diamond */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                {/* Baseball Diamond Layout */}
                                <div className="flex flex-col items-center justify-center">
                                    {/* Pitcher */}
                                    <div className="mb-8">
                                        <PositionSlot
                                            position="P"
                                            player={dreamTeam.positions['P']}
                                            onRemovePlayer={() => unassignPosition('P')}
                                        />
                                    </div>

                                    {/* Outfield Row */}
                                    <div className="flex gap-8 mb-8 justify-center">
                                        <PositionSlot
                                            position="LF"
                                            player={dreamTeam.positions['LF']}
                                            onRemovePlayer={() => unassignPosition('LF')}
                                        />
                                        <div className="w-56" />
                                        <PositionSlot
                                            position="RF"
                                            player={dreamTeam.positions['RF']}
                                            onRemovePlayer={() => unassignPosition('RF')}
                                        />
                                    </div>

                                    {/* Infield Row 1 */}
                                    <div className="flex gap-8 mb-8 justify-center">
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

                                    {/* Infield Row 2 */}
                                    <div className="flex gap-8 justify-center">
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
                                        <PositionSlot
                                            position="CF"
                                            player={dreamTeam.positions['CF']}
                                            onRemovePlayer={() => unassignPosition('CF')}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 flex gap-4 justify-center flex-wrap">
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
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">
                                    Available Players ({availablePlayers.length})
                                </h2>
                                <div className="max-h-96 overflow-y-auto">
                                    {availablePlayers.length === 0 ? (
                                        <p className="text-center text-gray-500 py-8">
                                            All players assigned!
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {availablePlayers.map(player => (
                                                <div
                                                    key={player.dreamTeamId}
                                                    className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded"
                                                >
                                                    <p className="font-semibold text-sm text-gray-800">
                                                        {player.FirstName} {player.LastName}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {player.Position}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {player.Team}
                                                    </p>
                                                    <button
                                                        onClick={() => removePlayer(player.dreamTeamId)}
                                                        className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded transition duration-300"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
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
