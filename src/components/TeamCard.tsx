import type {Team} from "../types/team";
import {Link} from "react-router-dom";

type TeamCardProps = {
    name: Team["Name"],
    city: Team["City"],
    logo?: Team["WikipediaLogoUrl"],
    onClick?: () => void
};

export const TeamCard = ({name, city, logo, onClick}: TeamCardProps) => {


    return (
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300">
            {logo && (
                <Link href='/player/${}' passHref>
                    <img
                        src={logo}
                        alt={name}
                        className="w-20 h-20 mx-auto mb-4"
                    />
                </Link>

            )}

            <h2 className="text-xl font-bold text-center">{name}</h2>

            <p className="text-gray-600 text-center">{city}</p>


        </div>
    );
};