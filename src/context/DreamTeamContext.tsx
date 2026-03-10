import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { DreamTeamState, Position, DreamTeamPlayer } from '../types/dreamTeam';
import type { Player } from '../types/player';

type DreamTeamContextType = {
    dreamTeam: DreamTeamState;
    addPlayer: (player: Player) => void;
    removePlayer: (playerId: string) => void;
    assignPosition: (playerId: string, position: Position) => boolean;
    unassignPosition: (position: Position) => void;
    clearDreamTeam: () => void;
};

const DreamTeamContext = createContext<DreamTeamContextType | undefined>(undefined);

const STORAGE_KEY = 'dreamTeam';

const getInitialState = (): DreamTeamState => {
    const positions: Record<Position, DreamTeamPlayer | null> = {
        'C': null,
        '1B': null,
        '2B': null,
        '3B': null,
        'SS': null,
        'LF': null,
        'CF': null,
        'RF': null,
        'SP': null,
        'RP': null,
    };
    return {
        players: [],
        positions,
    };
};

const getInitialStateFromStorage = (): DreamTeamState => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const data = JSON.parse(stored) as DreamTeamState;
            return data;
        }
    } catch (error) {
        console.error('Error loading dream team from localStorage:', error);
        localStorage.removeItem(STORAGE_KEY);
    }
    return getInitialState();
};

export const DreamTeamProvider = ({ children }: { children: ReactNode }) => {
    const [dreamTeam, setDreamTeam] = useState<DreamTeamState>(()=>getInitialStateFromStorage());

    // Save to localStorage whenever dreamTeam changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dreamTeam));
            console.log('💾 Dream Team saved to localStorage');
        } catch (error) {
            console.error('Error saving dream team to localStorage:', error);
        }
    }, [dreamTeam]);

    const addPlayer = (player: Player) => {
        const dreamTeamId = crypto.randomUUID();
        const dreamTeamPlayer: DreamTeamPlayer = {
            ...player,
            dreamTeamId,
        };
        setDreamTeam(prev => ({
            ...prev,
            players: [...prev.players, dreamTeamPlayer],
        }));
    };

    const removePlayer = (playerId: string) => {
        setDreamTeam(prev => {
            const updatedPositions = { ...prev.positions };
            (Object.keys(updatedPositions) as Position[]).forEach(pos => {
                if (updatedPositions[pos]?.dreamTeamId === playerId) {
                    updatedPositions[pos] = null;
                }
            });
            return {
                ...prev,
                players: prev.players.filter(p => p.dreamTeamId !== playerId),
                positions: updatedPositions,
            };
        });
    };

    const assignPosition = (playerId: string, position: Position): boolean => {
        const player = dreamTeam.players.find(p => p.dreamTeamId === playerId);
        if (!player) return false;

        // Validate position matches (SP and RP can accept P position)
        const isValidPosition = player.Position === position ||
            ((position === 'SP' || position === 'RP') && player.Position === 'P');

        if (!isValidPosition) {
            // Dispatch custom event for toast notification
            window.dispatchEvent(
                new CustomEvent('showToast', {
                    detail: {
                        message: `${player.FirstName} ${player.LastName} plays ${player.Position}, not ${position}.`,
                        type: 'error',
                    },
                })
            );
            return false;
        }

        setDreamTeam(prev => {
            const updatedPositions = { ...prev.positions };

            // Clear this player from any other position
            (Object.keys(updatedPositions) as Position[]).forEach(pos => {
                if (updatedPositions[pos]?.dreamTeamId === playerId) {
                    updatedPositions[pos] = null;
                }
            });

            // Assign to new position
            updatedPositions[position] = player;

            return {
                ...prev,
                positions: updatedPositions,
            };
        });

        return true;
    };

    const unassignPosition = (position: Position) => {
        setDreamTeam(prev => ({
            ...prev,
            positions: {
                ...prev.positions,
                [position]: null,
            },
        }));
    };

    const clearDreamTeam = () => {
        setDreamTeam(getInitialState());
    };

    return (
        <DreamTeamContext.Provider value={{
            dreamTeam,
            addPlayer,
            removePlayer,
            assignPosition,
            unassignPosition,
            clearDreamTeam,
        }}>
            {children}
        </DreamTeamContext.Provider>
    );
};

export const useDreamTeamContext = () => {
    const context = useContext(DreamTeamContext);
    if (!context) {
        throw new Error('useDreamTeamContext debe ser usado dentro de DreamTeamProvider');
    }
    return context;
};
