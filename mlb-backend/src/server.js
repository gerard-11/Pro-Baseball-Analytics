import "dotenv/config";
import express from "express";
import cors from "cors";
import teamsRouter from "./routes/allTeams.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
console.log("API KEY:", process.env.SPORTSDATA_API_KEY);
app.use("/api/allTeams", teamsRouter);

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});