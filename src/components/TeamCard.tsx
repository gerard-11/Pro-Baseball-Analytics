import type {Team} from "../types/team";
import {Link} from "react-router-dom";
import { useTeamContext } from "../context/TeamContext";

type TeamCardProps = {
    name: Team["Name"],
    city: Team["City"],
    logo?: Team["WikipediaLogoUrl"],
    onClick?: () => void
    keyTeam: Team["keyTeam"],
};

export const TeamCard = ({name, city, logo, keyTeam}: TeamCardProps) => {
    const { setSelectedTeamKey, setTeamName, setTeamLogo } = useTeamContext()

    const handleTeamSelect = () => {
        setSelectedTeamKey(keyTeam)
        setTeamName(name)
        setTeamLogo(logo ?? null)
    }

    return (
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 hover:shadow-xl transition duration-300">
            {logo && (
                <Link to={`/players/${keyTeam}`} onClick={handleTeamSelect}>
                    <img
                        src={logo}
                        alt={name}
                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4"
                    />
                </Link>
            )}
            <h2 className="text-lg sm:text-xl font-bold text-center">{name}</h2>
            <p className="text-xs sm:text-sm text-gray-600 text-center">{city}</p>
        </div>
    );
};