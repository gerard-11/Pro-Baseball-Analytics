import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Player } from '../types/player';

type TeamContextType = {
    selectedTeamKey: string | null;
    setSelectedTeamKey: (key: string | null) => void;
    teamName: string | null;
    setTeamName: (name: string | null) => void;
    teamLogo: string | null;
    setTeamLogo: (logo: string | null) => void;
    players: Player[];
    setPlayers: (players: Player[]) => void;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTeamKey, setSelectedTeamKey] = useState<string | null>(null);
    const [teamName, setTeamName] = useState<string | null>(null);
    const [teamLogo, setTeamLogo] = useState<string | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);

    return (
        <TeamContext.Provider value={{
            selectedTeamKey,
            setSelectedTeamKey,
            teamName,
            setTeamName,
            teamLogo,
            setTeamLogo,
            players,
            setPlayers,
        }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeamContext = () => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeamContext debe ser usado dentro de TeamProvider');
    }
    return context;
};
