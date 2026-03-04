import type {Player} from "../types/player.ts";

type PlayerCardProps = {
    FirstName: Player["FirstName"],
    PhotoUrl: Player["PhotoUrl"],
    Team: Player["Team"],
    Position: Player["Position"],
    BatHand: Player["BatHand"],
    Jersey: Player["Jersey"],
    LastName: Player["LastName"],
    onAddToDreamTeam?: () => void,
};

const PlayerCard= ({FirstName, PhotoUrl, Jersey, Team,Position,BatHand,LastName, onAddToDreamTeam }:PlayerCardProps)=>{
    return (
        <div className="flex justify-center">
            <div className="bg-white  border-4 border-blue-500 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 w-72 text-center">
                <img
                    src={PhotoUrl}
                    alt={FirstName}
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-100 mb-4"
                />

                <h1 className="text-xl font-bold text-gray-800">
                    {FirstName} {LastName}
                </h1>

                <p className="text-sm text-gray-500 mb-3">
                    {Team}
                </p>

                <div className="space-y-1 text-sm text-gray-700">
                    <p><span className="font-semibold">#</span> {Jersey}</p>
                    <p><span className="font-semibold">Position:</span> {Position}</p>
                    <p><span className="font-semibold">Bat:</span> {BatHand}</p>
                </div>

                {onAddToDreamTeam && (
                    <button
                        onClick={onAddToDreamTeam}
                        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                        Add to Dream Team
                    </button>
                )}
            </div>
        </div>

    )
}

export { PlayerCard };