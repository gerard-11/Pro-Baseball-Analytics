import { useDroppable } from '@dnd-kit/core';
import type { Position, DreamTeamPlayer } from '../types/dreamTeam';
import { DreamTeamCard } from './DreamTeamCard';

type PositionSlotProps = {
    position: Position;
    player: DreamTeamPlayer | null;
    onRemovePlayer: () => void;
};

const POSITION_NAMES: Record<Position, string> = {
    'C': 'Catcher',
    '1B': '1st Base',
    '2B': '2nd Base',
    '3B': '3rd Base',
    'SS': 'Shortstop',
    'LF': 'Left Field',
    'CF': 'Center Field',
    'RF': 'Right Field',
    'SP': 'Starting Pitcher',
    'RP': 'Relief Pitcher',
};

export const PositionSlot = ({ position, player, onRemovePlayer }: PositionSlotProps) => {
    const { setNodeRef, isOver, active } = useDroppable({
        id: position,
        data: { position },
    });

    const isValidDrag = active && (active.data as any)?.player?.Position === position;
    const showHighlight = isOver && isValidDrag;

    const sizeClasses = 'w-20 h-28 sm:w-20 sm:h-28 md:w-24 md:h-32 lg:w-28 lg:h-36 max-w-xs';

    return (
        <div
            ref={setNodeRef}
            className={`
                flex flex-col items-center justify-center
                ${sizeClasses} rounded-lg border-3 border-dashed transition duration-300
                ${showHighlight ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-300'}
                ${player ? '' : 'hover:bg-gray-100'}
            `}
        >
            {player ? (
                <DreamTeamCard
                    player={player}
                    position={position}
                    onRemove={onRemovePlayer}
                />
            ) : (
                <div className="text-center pointer-events-none">
                    <p className="text-xs sm:text-sm md:text-lg font-bold text-gray-500">{position}</p>
                    <p className="text-xs text-gray-400">{POSITION_NAMES[position]}</p>
                    <p className="text-xs text-gray-300 mt-1">Drag here</p>
                </div>
            )}
        </div>
    );
};
