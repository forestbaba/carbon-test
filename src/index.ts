import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./database/config";
import { Router as userRouetr } from "./routers/user.routes";
import { Router as packageRouter } from "./routers/package.routes";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRouetr);
app.use("/api/packages", packageRouter);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database is connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

