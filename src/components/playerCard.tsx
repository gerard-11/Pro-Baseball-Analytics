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
    onRemoveFromDreamTeam?: () => void,
    isInDreamTeam?: boolean,
};

const PlayerCard= ({FirstName, PhotoUrl, Jersey, Team,Position,BatHand,LastName, onAddToDreamTeam, onRemoveFromDreamTeam, isInDreamTeam }:PlayerCardProps)=>{
    return (
        <div className="flex justify-center w-full h-full">
            <div className="bg-white border-4 border-blue-500 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 sm:p-5 md:p-6 w-full max-w-sm md:max-w-md text-center">
                <img
                    src={PhotoUrl}
                    alt={FirstName}
                    className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover border-4 border-blue-100 mb-4"
                />

                <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                    {FirstName} {LastName}
                </h1>

                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                    {Team}
                </p>

                <div className="space-y-1 text-xs sm:text-sm text-gray-700">
                    <p><span className="font-semibold">#</span> {Jersey}</p>
                    <p><span className="font-semibold">Position:</span> {Position}</p>
                    <p><span className="font-semibold">Bat:</span> {BatHand}</p>
                </div>

                {onAddToDreamTeam && (
                    <>
                        {isInDreamTeam ? (
                            <button
                                onClick={onRemoveFromDreamTeam}
                                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-sm rounded-lg transition duration-300 flex items-center justify-center gap-2"
                            >
                                <span>⭐</span>
                                <span>Remove from Dream Team</span>
                            </button>
                        ) : (
                            <button
                                onClick={onAddToDreamTeam}
                                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-sm rounded-lg transition duration-300"
                            >
                                Add to Dream Team
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>

    )
}

export { PlayerCard };