import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import { useDreamTeamContext } from '../context/DreamTeamContext';
import { PositionSlot } from '../components/PositionSlot';
import { AvailablePlayerItem } from '../components/AvailablePlayerItem';
import { Toast } from '../components/Toast';
import type { Position } from '../types/dreamTeam';
import type { ToastType } from '../components/Toast';

export const DreamTeam = () => {
    const { dreamTeam, assignPosition, unassignPosition, removePlayer, clearDreamTeam } =
        useDreamTeamContext();
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastType, setToastType] = useState<ToastType>('success');

    const availablePlayers = dreamTeam.players.filter(player => {
        return !Object.values(dreamTeam.positions).some(p => p?.dreamTeamId === player.dreamTeamId);
    });

    useEffect(() => {
        // Listen for toast events from context
        const handleShowToast = (event: Event) => {
            const customEvent = event as CustomEvent;
            setToastMessage(customEvent.detail.message);
            setToastType(customEvent.detail.type || 'success');
            setToastVisible(true);
        };

        window.addEventListener('showToast', handleShowToast);
        return () => window.removeEventListener('showToast', handleShowToast);
    }, []);

    const showToast = (message: string, type: ToastType = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setToastVisible(true);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const playerId = active.id as string;
        const targetPosition = over.id as Position;

        const success = assignPosition(playerId, targetPosition);
        if (success) {
            const player = dreamTeam.players.find(p => p.dreamTeamId === playerId);
            if (player) {
                showToast(`${player.FirstName} ${player.LastName} assigned to ${targetPosition}`, 'success');
            }
        }
    };

    const handleExport = () => {
        try {
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
            showToast('Dream Team exported successfully!', 'success');
        } catch (error) {
            showToast('Error exporting Dream Team', 'error');
        }
    };

    const handleCopy = () => {
        try {
            const exportData = {
                timestamp: new Date().toISOString(),
                dreamTeam: dreamTeam.positions,
            };
            navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
            showToast('Dream Team copied to clipboard!', 'success');
        } catch (error) {
            showToast('Error copying to clipboard', 'error');
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
                        My Dream Team
                    </h1>
                    <p className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 md:mb-8">
                        Drag players to their positions to build your perfect lineup
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 min-h-96">
                        {/* Main Field */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-2xl p-1 sm:p-2 md:p-3 lg:p-4 border-4 border-blue-200 flex flex-col overflow-x-hidden">
                                {/* Baseball Field with Grid Layout */}
                                <div className="w-full flex-1 flex flex-col">
                                    {/* Top - Pitchers (SP and RP) */}
                                    <div className="flex justify-center gap-1 sm:gap-1 md:gap-2 lg:gap-3 items-start mt-2 sm:mt-2 md:mt-4 lg:mt-6">
                                        <PositionSlot
                                            position="SP"
                                            player={dreamTeam.positions['SP']}
                                            onRemovePlayer={() => unassignPosition('SP')}
                                        />
                                        <PositionSlot
                                            position="RP"
                                            player={dreamTeam.positions['RP']}
                                            onRemovePlayer={() => unassignPosition('RP')}
                                        />
                                    </div>

                                    {/* Outfield row with CF in middle */}
                                    <div className="flex justify-between gap-0.5 sm:gap-1 md:gap-2 lg:gap-3 items-start mt-2 sm:mt-2 md:mt-4 lg:mt-6">
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
                                    <div className="flex justify-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-4 items-start mt-2 sm:mt-2 md:mt-4 lg:mt-6">
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
                                    <div className="flex justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 items-start mt-2 sm:mt-2 md:mt-4 lg:mt-6">
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
                                <div className="mt-4 sm:mt-6 md:mt-8 flex gap-2 sm:gap-3 md:gap-4 justify-center flex-wrap">
                                    <button
                                        onClick={clearDreamTeam}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 sm:py-2 sm:px-6 text-xs sm:text-sm rounded-lg transition duration-300"
                                    >
                                        Clear Dream Team
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 sm:py-2 sm:px-6 text-xs sm:text-sm rounded-lg transition duration-300"
                                    >
                                        Copy to Clipboard
                                    </button>
                                    <button
                                        onClick={handleExport}
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 sm:py-2 sm:px-6 text-xs sm:text-sm rounded-lg transition duration-300"
                                    >
                                        Export as JSON
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Available Players Sidebar */}
                        <div className="md:col-span-1 lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-4 sm:top-6 md:top-8 h-fit">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
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

            <Toast
                message={toastMessage}
                isVisible={toastVisible}
                onClose={() => setToastVisible(false)}
                type={toastType}
            />
        </DndContext>
    );
};
