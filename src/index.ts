import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./database/config";
import { Router as userRouetr } from "./routers/user.routes";
import { Router as inventoryRouter } from "./routers/inventory.routes";
import { Router as adminRouter } from "./routers/duplo.admin.routes";
import { Router as deptHeadRouter } from "./routers/dept.heads.routes";
import connect from "./database/connect";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", userRouetr);
app.use("/api", inventoryRouter);
app.use("/api/admin", adminRouter);
app.use("/api/department-heads", deptHeadRouter);

AppDataSource.initialize()
  .then(async () => {
    await connect()
    console.log("Database is connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

