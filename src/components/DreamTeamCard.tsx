import { useDraggable } from '@dnd-kit/core';
import type { DreamTeamPlayer, Position } from '../types/dreamTeam';

type DreamTeamCardProps = {
    player: DreamTeamPlayer;
    position?: Position;
    onRemove?: () => void;
};

export const DreamTeamCard = ({ player, position, onRemove }: DreamTeamCardProps) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: player.dreamTeamId,
        data: {
            player,
            fromPosition: position || null,
        },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`
                bg-white border-3 border-blue-500 rounded-lg shadow-md hover:shadow-xl
                transition duration-300 p-2 w-40 text-center cursor-move
                ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
            `}
        >
            <img
                src={player.PhotoUrl}
                alt={player.FirstName}
                className="w-12 h-12 mx-auto rounded-full object-cover border-2 border-blue-100 mb-1"
            />

            <h2 className="text-sm font-bold text-gray-800 line-clamp-2">
                {player.FirstName} {player.LastName}
            </h2>

            <p className="text-xs text-gray-500">
                {player.Team}
            </p>

            <div className="space-y-0 text-xs text-gray-700">
                <p><span className="font-semibold">#</span> {player.Jersey}</p>
                <p><span className="font-semibold">Pos:</span> {player.Position}</p>
            </div>

            {onRemove && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onRemove();
                    }}
                    className="mt-1 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-0.5 px-2 rounded text-xs transition duration-300"
                >
                    Remove
                </button>
            )}
        </div>
    );
};
