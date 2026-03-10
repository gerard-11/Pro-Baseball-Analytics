import { useDraggable } from '@dnd-kit/core';
import type { DreamTeamPlayer } from '../types/dreamTeam';

type AvailablePlayerItemProps = {
    player: DreamTeamPlayer;
    onRemove: () => void;
};

export const AvailablePlayerItem = ({ player, onRemove }: AvailablePlayerItemProps) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: player.dreamTeamId,
        data: {
            player,
            fromPosition: null,
        },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`
                p-2 sm:p-2 md:p-3 border-l-4 border-blue-500 bg-blue-50 rounded cursor-move hover:bg-blue-100
                transition duration-200 ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
            `}
        >
            <p className="font-semibold text-xs sm:text-sm text-gray-800 line-clamp-1">
                {player.FirstName} {player.LastName}
            </p>
            <p className="text-xs text-gray-600 font-medium">
                {player.Position}
            </p>
            <p className="text-xs text-gray-500">
                {player.Team} #{player.Jersey}
            </p>
            <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={onRemove}
                className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded transition duration-300"
            >
                Remove
            </button>
        </div>
    );
};
