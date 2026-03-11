import "dotenv/config";
import express from "express";
import cors from "cors";
import teamsRouter from "./routes/allTeams.routes.js";
import playersByTeamRouter from "./routes/playersByTeam.routes.js";
import headshotsRouter from "./routes/headshots.routes.js";
import searchRouter from "./routes/search.routes.js";
import newsRouter from "./routes/news.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/allTeams", teamsRouter);
app.use("/api/playersByTeam", playersByTeamRouter);
app.use("/api/headshots", headshotsRouter);
app.use("/api/search", searchRouter);
app.use("/api/news", newsRouter);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});