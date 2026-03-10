import type { Player } from './player';

export type Position = 'C' | '1B' | '2B' | '3B' | 'SS' | 'LF' | 'CF' | 'RF' | 'SP' | 'RP';

export interface DreamTeamPlayer extends Player {
    dreamTeamId: string;
}

export interface DreamTeamState {
    players: DreamTeamPlayer[];
    positions: Record<Position, DreamTeamPlayer | null>;
}
