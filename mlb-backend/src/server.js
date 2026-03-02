import "dotenv/config";
import express from "express";
import cors from "cors";
import teamsRouter from "./routes/allTeams.routes.js";
import playersByTeamRouter from "./routes/playersByTeam.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/allTeams", teamsRouter);
app.use("/api/playersByTeam", playersByTeamRouter);

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});