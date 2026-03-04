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
                bg-white border-4 border-blue-500 rounded-xl shadow-md hover:shadow-xl
                transition duration-300 p-4 w-64 text-center cursor-move
                ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
            `}
        >
            <img
                src={player.PhotoUrl}
                alt={player.FirstName}
                className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-blue-100 mb-3"
            />

            <h2 className="text-lg font-bold text-gray-800">
                {player.FirstName} {player.LastName}
            </h2>

            <p className="text-xs text-gray-500 mb-2">
                {player.Team}
            </p>

            <div className="space-y-0.5 text-xs text-gray-700">
                <p><span className="font-semibold">#</span> {player.Jersey}</p>
                <p><span className="font-semibold">Position:</span> {player.Position}</p>
                <p><span className="font-semibold">Bat:</span> {player.BatHand}</p>
            </div>

            {onRemove && (
                <button
                    onClick={onRemove}
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-xs transition duration-300"
                >
                    Remove
                </button>
            )}
        </div>
    );
};
