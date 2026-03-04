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
    'P': 'Pitcher',
};

export const PositionSlot = ({ position, player, onRemovePlayer }: PositionSlotProps) => {
    const { setNodeRef, isOver, active } = useDroppable({
        id: position,
        data: { position },
    });

    const isValidDrag = active && (active.data as any)?.player?.Position === position;
    const showHighlight = isOver && isValidDrag;

    return (
        <div
            ref={setNodeRef}
            className={`
                flex flex-col items-center justify-center
                w-56 h-72 rounded-xl border-4 border-dashed transition duration-300
                ${showHighlight ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-300'}
                ${player ? '' : 'hover:bg-gray-100'}
            `}
        >
            {player ? (
                <div onClick={(e) => e.stopPropagation()}>
                    <DreamTeamCard
                        player={player}
                        position={position}
                        onRemove={onRemovePlayer}
                    />
                </div>
            ) : (
                <div className="text-center pointer-events-none">
                    <p className="text-xl font-bold text-gray-500">{position}</p>
                    <p className="text-sm text-gray-400">{POSITION_NAMES[position]}</p>
                    <p className="text-xs text-gray-300 mt-2">Drag player here</p>
                </div>
            )}
        </div>
    );
};
