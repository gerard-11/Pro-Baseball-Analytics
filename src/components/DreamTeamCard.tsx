import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
import type { DreamTeamPlayer, Position } from '../types/dreamTeam';

type DreamTeamCardProps = {
    player: DreamTeamPlayer;
    position?: Position;
    onRemove?: () => void;
};

export const DreamTeamCard = ({ player, position, onRemove }: DreamTeamCardProps) => {
    const [showRemoveBtn, setShowRemoveBtn] = useState(false);

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: player.dreamTeamId,
        data: {
            player,
            fromPosition: position || null,
        },
    });

    const handleRemoveClick = () => {
        if (onRemove) {
            onRemove();
        }
    };

    return (
        <div className="relative">
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                className={`
                    bg-white border-3 border-blue-500 rounded-lg shadow-md hover:shadow-xl
                    transition duration-300 p-1 sm:p-2 w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 text-center cursor-pointer flex flex-col items-center justify-center
                    ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
                `}
                onMouseEnter={() => setShowRemoveBtn(true)}
                onMouseLeave={() => setShowRemoveBtn(false)}
            >
                <img
                    src={player.PhotoUrl}
                    alt={player.FirstName}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto rounded-full object-cover border-2 border-blue-100 mb-1"
                />

                <h2 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2">
                    {player.FirstName} {player.LastName}
                </h2>

                <p className="text-xs text-gray-500">
                    {player.Team}
                </p>

                <div className="space-y-0 text-xs text-gray-700">
                    <p><span className="font-semibold">#</span> {player.Jersey}</p>
                    <p><span className="font-semibold">Pos:</span> {player.Position}</p>
                </div>
            </div>

            {onRemove && showRemoveBtn && (
                <button
                    onClick={handleRemoveClick}
                    onMouseEnter={() => setShowRemoveBtn(true)}

                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs transition duration-1000 shadow-lg"
                    title="Remove player"
                >
                    ✕
                </button>
            )}
        </div>
    );
};
