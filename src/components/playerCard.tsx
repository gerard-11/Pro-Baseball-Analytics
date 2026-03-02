import type {Player} from "../types/player.ts";

type PlayerCardProps = {
    FirstName: Player["FirstName"],
    PhotoUrl: Player["PhotoUrl"],
    Team: Player["Team"],
    Position: Player["Position"],
    BatHand: Player["BatHand"],
    Jersey: Player["Jersey"],
    LastName: Player["LastName"],
};

const PlayerCard= ({FirstName, PhotoUrl, Jersey, Team,Position,BatHand,LastName }:PlayerCardProps)=>{
    return (
        <div style={{display: "flex",
            flexWrap:"wrap",flexDirection: "column"}}>
            <div style={{display: "flex",flexDirection: "column", justifyContent:"center",height: "300px", width: "300px"}}>
                <img src={PhotoUrl} alt={FirstName} width="100px" height="100px" />
                <h1>{FirstName} {LastName}</h1>
                <p>Number: {Jersey}</p>
                <p>Position: {Position}</p>
                <p>BatHand: {BatHand}</p>
                <p>Team: {Team}</p>
            </div>

        </div>

    )
}

export { PlayerCard };